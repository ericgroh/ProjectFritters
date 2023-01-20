import { SheetService } from './../../shared/services/sheet.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Sheet } from 'src/app/shared/models/sheet';

@Component({
  selector: 'app-create-sheet',
  templateUrl: './create-sheet.component.html',
  styleUrls: ['./create-sheet.component.scss']
})
export class CreateSheetComponent implements OnInit {
  form = this._formBuilder.group({
    name: ['', Validators.required],
    eventTime: ['', Validators.required],
    password: ['', Validators.required],

  });

  constructor(
    private _formBuilder: FormBuilder,
    private sheetService: SheetService,
  ) { }

  ngOnInit(): void {
  }

  createSheet() {
    let sheet = this.sheetService.createSheet(this.form.value);
    console.log(sheet);
  }

}
