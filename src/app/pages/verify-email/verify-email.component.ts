import { map } from 'rxjs';
import { User } from './../../shared/models';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().snapshotChanges().pipe(
      map(c => ({ uid: c.payload.id, ...c.payload.data() }) as User)
    ).subscribe(data => {
      this.user = data;
    });

  }

  resendEmail(): void {
    this.authService.SendVerificationMail();
  }
}
