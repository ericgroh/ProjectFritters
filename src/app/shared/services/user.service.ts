import { User } from './../models';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersRef: AngularFirestoreCollection<User>;

  constructor(
    private store: AngularFirestore,
  ) {
    this.usersRef = this.store.collection('users');
  }

  getCurrentUserId(): string {
    let user: User = JSON.parse(localStorage.getItem(`user`)!);
    return user.uid;
  }

  getCurrentUser(): AngularFirestoreDocument<User> {
    const user = JSON.parse(localStorage.getItem(`user`)!);
    return this.usersRef.doc(user.uid);
  }

  createUserData(data: any) {
    const user: User = {
      uid: data.id,
      firstName: '',
      lastName: '',
      email: data.email,
      username: '',
      photoURL: '',
      isNew: true,
      isAdmin: false
    };
    return this.usersRef.doc(user.uid).set(user);
  }

  updateUser(user: User): Promise<void> {
    return this.usersRef.doc(user.uid).update(user);
  }
}
