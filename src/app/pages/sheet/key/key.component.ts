import { Sheet, Entry, Choice, Answer, Key } from 'src/app/shared/models';
import { map } from 'rxjs';
import { SheetService } from 'src/app/shared/services/sheet.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  displayedColumns: string[] = ['question', 'type'];
  entryId: string;
  key: Key;
  sheet: Sheet;

  constructor(
    private route: ActivatedRoute,
    private readonly sheetService: SheetService,
  ) {
    this.route.params.subscribe(params => {
      this.entryId = params[`id`];
    });


  }

  ngOnInit(): void {
    this.sheetService.getKey(this.entryId).snapshotChanges().pipe(
      map(changes => ({ id: changes.payload.id, ...changes.payload.data() } as Key))
    ).subscribe(data => {

      this.key = data;
      // this.sheetService.getSheet(data.sheetId).snapshotChanges().pipe(
      //   map(changes => ({ id: changes.payload.id, ...changes.payload.data() } as Sheet))
      // ).subscribe(data => {
      //   this.sheet = data;
      // });
    });
  }

  savePropAnswer(answer: Answer, option: Choice) {
    answer.answer = option;
    // this.key.answers.map(a => {
    //   if (a.id == answer.id) {
    //     a.answer = option;
    //   }
    // });

    this.sheetService.updateKey(this.key);
  }

  convertTime(time: string): string {
    return moment(time).calendar();
  }



}
