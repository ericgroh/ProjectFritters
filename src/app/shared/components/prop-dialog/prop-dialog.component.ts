import { Prop, PropType } from './../../models';
import { Observable } from 'rxjs';
import { SheetService } from 'src/app/shared/services/sheet.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-prop-dialog',
  templateUrl: './prop-dialog.component.html',
  styleUrls: ['./prop-dialog.component.scss']
})
export class PropDialogComponent implements OnInit {
  public propTypes$: Observable<PropType[]>;

  constructor(
    public dialogRef: MatDialogRef<PropDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prop,
    private sheetService: SheetService
  ) {
    this.propTypes$ = this.sheetService.propTypes$;
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

}
