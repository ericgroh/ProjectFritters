import { User } from './../../shared/models/user';
import { UserService } from './../../shared/services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { async } from '@firebase/util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user!: User;
  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.profileForm.patchValue(user);
    });
    console.log(this.profileForm.value);

  }

  onSubmit(): Promise<void> {
    console.log('current user', this.user);
    console.log("profile", this.profileForm.value);
    let user = { ...this.user, ...this.profileForm.value, ...{ isNew: false } }
    console.log(user);
    return this.userService.updateUser(user);
  }

  buildForm(): void {
    this.profileForm = this.fb.group({
      firstName: [this.user?.firstName],
      lastName: [this.user?.lastName],
      email: [''],
    });
  }

}
