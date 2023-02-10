import { map } from 'rxjs';
import { User } from './../../shared/models';
import { UserService } from './../../shared/services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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

    this.userService.getCurrentUser().snapshotChanges().pipe(
      map(c => ({ uid: c.payload.id, ...c.payload.data() }) as User)
    ).subscribe(user => {
      this.user = user;
      this.profileForm.patchValue(user);
    });

  }

  onSubmit(): Promise<void> {
    let user = { ...this.user, ...this.profileForm.value, ...{ isNew: false } }
    return this.userService.updateUser(user);
  }

  buildForm(): void {
    this.profileForm = this.fb.group({
      username: [this.user?.username],
    });
  }

}
