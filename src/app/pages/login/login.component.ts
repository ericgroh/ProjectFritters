import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
    private router: Router
  ) { }

  onSubmit() {
    this.authService
      .SignIn(this.form.value.email, this.form.value.password)
      .then(data => {
        let route = '';
        console.log(data);
        if (!data.user.emailVerified) {
          route = 'verify-email';
        }
        this.router.navigate([route]);
      })
      .catch(error => console.log(error));
  }

}
