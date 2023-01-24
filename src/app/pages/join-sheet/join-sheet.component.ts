import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Sheet } from 'src/app/shared/models/sheet';
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
    private readonly sheetService: SheetService
  ) {
    this.sheetService.getPublicSheets().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.sheets = data
    });
  }

  ngOnInit(): void {
  }

}
