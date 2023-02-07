import { Router } from '@angular/router';
import { Entry } from './../../models/entry';
import { map, Observable } from 'rxjs';
import { SheetService } from 'src/app/shared/services/sheet.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {
  public entries$: Observable<Entry[]>;
  displayedColumns: string[] = ['sheetName', 'time', 'score', `action`];
  constructor(
    private sheetService: SheetService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.entries$ = this.sheetService.getCurrentUserEntries().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ ...c.payload.doc.data() } as Entry)))
    )
  }

  convertTime(time: string): string {
    return moment(time).calendar();
  }

  open(id: string) {
    this.router.navigate([`entries/${id}`]);
  }

}
