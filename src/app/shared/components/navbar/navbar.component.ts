import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>
  constructor(
    // private userService: UserService,
    private authService: AuthService,
    // public router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.IsLoggedIn();
    // this.user$ = this.getUser();
  }

  // getUser(): Observable<User> {
  //   return this.userService.getCurrentUser();
  // }

  logout(): void {
    this.authService.SignOut();
  }

}
