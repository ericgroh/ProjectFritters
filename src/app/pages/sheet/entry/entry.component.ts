import { Sheet, Entry, Choice, Answer, Prop } from 'src/app/shared/models';
import { map, Observable } from 'rxjs';
import { SheetService } from 'src/app/shared/services/sheet.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  displayedColumns: string[] = ['question', 'type'];
  entryId: string;
  entry: Entry;
  props: Prop[];

  constructor(
    private route: ActivatedRoute,
    private readonly sheetService: SheetService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.entryId = params[`id`];

      this.sheetService.getEntry(this.entryId).snapshotChanges().pipe(
        map(changes => ({ ...changes.payload.data() } as Entry))
      ).subscribe(entry => this.entry = entry);

      this.sheetService.getEntryProps(this.entryId).snapshotChanges().pipe(
        map(changes => changes.map(c => ({ ...c.payload.doc.data() } as Prop)))
      ).subscribe(props => this.props = props);
    });
  }

  saveEntryPropAnswer(prop: Prop, option: Choice) {
    prop.answer = option;
    this.sheetService.updateEntryAnswer(this.entryId, prop);
  }

  saveTieBreaker(option: number) {
    this.entry.tieBreaker.answer = option;
    this.sheetService.updateEntry(this.entry);
  }

  convertTime(time: string): string {
    return moment(time).calendar();
  }

  disableBtn() {
    return new Date().getTime() >= new Date(this.entry?.eventTime).getTime();
  }

}
