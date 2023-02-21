import { map } from 'rxjs';
import { SheetService } from '../../../shared/services/sheet.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { Sheet, Status, User } from 'src/app/shared/models';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-create-sheet',
  templateUrl: './create-sheet.component.html',
  styleUrls: ['./create-sheet.component.scss']
})
export class CreateSheetComponent implements OnInit {
  user: User;
  showPassword: boolean = false;
  form = this._formBuilder.group({
    name: ['', Validators.required],
    eventTime: ['', Validators.required],
    password: ['', Validators.required],
    isPublic: ["true"]

  });

  constructor(
    private _formBuilder: FormBuilder,
    private sheetService: SheetService,
    private userService: UserService,
    private router: Router
  ) {
    this.userService.getCurrentUser().snapshotChanges().pipe(
      map(c => ({ uid: c.payload.id, ...c.payload.data() }) as User)
    ).subscribe(user => { this.user = user });
  }

  ngOnInit(): void {
  }

  async createSheet() {
    console.log(this.form.value)
    let sheet: Sheet = {
      ...this.form.value,
      isPublic: this.form.value.isPublic === "true",
      eventTime: new Date(this.form.value.eventTime).getTime(),
      ownerId: this.user.uid,
      ownerName: this.user.username,
      participants: 0,
      status: Status.Pending
    };

    let sheetId = await this.sheetService.createSheet(sheet);

    this.router.navigateByUrl(`sheets/${sheetId}/update`);
  }

  togglePassword(event: MatRadioChange) {
    console.log(event.value === 'false');
    console.log(event.value);
    this.showPassword = event.value === 'false'
  }
}
