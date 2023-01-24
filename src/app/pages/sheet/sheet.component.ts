import { MatDialog } from '@angular/material/dialog';
import { SheetService } from './../../shared/services/sheet.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Prop, Sheet } from 'src/app/shared/models';
import { PropDialogComponent } from 'src/app/shared/components/prop-dialog/prop-dialog.component';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent {
  displayedColumns: string[] = ['question', 'type'];
  question: string;
  type: string;
  sheet: Sheet;
  sheetId: string;

  constructor(
    private route: ActivatedRoute,
    private sheetService: SheetService,
    public dialog: MatDialog
  ) {
    this.route.params.subscribe(params => {
      this.sheetId = params[`id`];
    });

    this.sheetService.getSheet(this.sheetId).snapshotChanges().pipe(
      map(c => ({ id: c.payload.id, ...c.payload.data() }))
    ).subscribe(data => {
      this.sheet = data;
    });
  }

  addProp() {
    const dialogRef = this.dialog.open(PropDialogComponent, {
      data: { question: this.question, type: this.type },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.sheet.props?.push(result as Prop);
        this.sheetService.update(this.sheet);
      }

    });
  }

  removeProp() {

  }

}
