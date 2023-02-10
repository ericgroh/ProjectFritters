import { map } from 'rxjs';
import { User } from 'src/app/shared/models';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.CheckIsLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    this.authService
      .SignIn(this.form.value.email, this.form.value.password)
      .then(data => {
        if (!data.user.emailVerified) {
          this.router.navigate(['verify-email']);
        }
        this.userService.getCurrentUser().snapshotChanges().pipe(
          map(c => ({ ...c.payload.data() }) as User)
        ).subscribe(user => {
          if (user.isNew) {
            this.router.navigate(['profile']);
          }
        });

      })
      .catch(error => console.log(error));
  }

}
