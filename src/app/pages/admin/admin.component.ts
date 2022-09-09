import { FormGroup, FormControl, Validators } from '@angular/forms';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  participants: Participant[] = [
    { id: 1, name: "jimmy" },
    { id: 2, name: "tom" }
  ]
  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
  })
  constructor() { }

  onSubmit() {
    console.log(this.form.value);
  }
}

export interface Participant {
  id: number,
  name: string
};
