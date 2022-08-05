import { User } from './../../shared/models/user';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  user!: User;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => this.user = user);
  }

  resendEmail(): void {
    console.log('sending email');
    this.authService.SendVerificationMail().then(data => console.log(data));
  }
}
