import { EntryService } from './../../../shared/services/entry.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Sheet } from 'src/app/shared/models';
import { SheetService } from 'src/app/shared/services/sheet.service';

@Component({
  selector: 'app-join-sheet',
  templateUrl: './join-sheet.component.html',
  styleUrls: ['./join-sheet.component.scss']
})
export class JoinSheetComponent implements OnInit {
  sheets: Sheet[];
  displayedColumns: string[] = ['name', 'owner', `join`];

  constructor(
    private readonly sheetService: SheetService,
    private readonly entryService: EntryService,
    private readonly router: Router
  ) {
    this.sheetService.getAvailableSheets().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.sheets = data
    });
  }

  joinSheet(sheet: Sheet) {
    let entryId = this.entryService.create(sheet);
    this.router.navigate([`entries/${entryId}`]);
  }

  ngOnInit(): void {
  }

}
