import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './../models/user';
import { UserService } from './user.service';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: User;
  private loginStatus = new BehaviorSubject<boolean>(this.CheckIsLoggedIn());
  private emailVerified = new BehaviorSubject<boolean>(false);

  constructor(
    public store: AngularFirestore,
    public auth: AngularFireAuth,
    private userService: UserService,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.auth.authState.subscribe(user => {
      console.log("authState called", user?.emailVerified)

      if (user && user.emailVerified) {
        console.log("setting localstorage")
        localStorage.setItem(`user`, JSON.stringify(user));
      }
      else {
        localStorage.setItem(`user`, `null`);
      }
    });

  }

  SignIn(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((data) => {
        if (data.user?.emailVerified) {
          this.emailVerified.next(true);
        }
        this.loginStatus.next(true);
        return data;
      });
  }

  SignUp(email: string, password: string): Promise<void> {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.SendVerificationMail();
        if (result.user) {
          this.userService.createUserData(result.user);
        }
      })
  }

  SendVerificationMail(): Promise<void> {
    return this.auth.currentUser
      .then((u) => {
        console.log(u);
        u?.sendEmailVerification().then(x => {
          console.log(x);
        })
      })
      .then(() => {
        this.router.navigate(['verify-email'])
      });
  }

  ForgotPassword(email: string): Promise<void> {
    return this.auth.sendPasswordResetEmail(email)
      .then(() => window.alert(`Password reset email sent, check your inbox`))
      .catch(error => window.alert(error.message));
  }

  CheckIsLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(`user`)!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  IsLoggedIn(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  IsEmailVerified(): Observable<boolean> {
    return this.emailVerified.asObservable();
  }

  // Sign out
  SignOut() {
    return this.auth.signOut().then(() => {
      this.loginStatus.next(false);
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}

export interface UserCredential {
  email: string;
  password: string;
}
