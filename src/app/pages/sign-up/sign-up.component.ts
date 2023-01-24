import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    this.authService.SignUp(this.form.value.email, this.form.value.password)
      .then(data => {
        let route = 'login'
        console.log(data);
        this.router.navigate([route]);
      })
  }

}
