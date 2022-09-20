import { Player } from './../../shared/models/player';
import { Router } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { User } from './../../shared/models/user';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject<Task[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user!: User;
  displayedColumns: string[] = ['position', 'name', 'score'];  // title = 'project-fritters';
  // todo = getObservable(this.store.collection('todo')) as Observable<Task[]>;
  // inProgress = getObservable(this.store.collection('inProgress')) as Observable<Task[]>;
  // done = getObservable(this.store.collection('done')) as Observable<Task[]>;

  persons: Player[] = [
    { firstName: "Pam", lastName: "Friedman", score: 14 },
    { firstName: "Zack", lastName: "Joseph", score: 13.5 },
    { firstName: "Kevin", lastName: "Factor", score: 14.5 },
    { firstName: "Mike", lastName: "Chornak", score: 11.5 },
    { firstName: "Jarrod", lastName: "Kalish", score: 12 },
    { firstName: "Danny", lastName: "Karliak", score: 13 },
    { firstName: "Alex", lastName: "Friedman", score: 12 },
    { firstName: "Rome", lastName: "Crews", score: 13.5 },
    { firstName: "Richard", lastName: "Feldtz", score: 11.5 },
    { firstName: "Gavin", lastName: "Bridegum", score: 10.5 },
    { firstName: "Anthony", lastName: "Rangel", score: 11 },
    { firstName: "Dan", lastName: "Reilley", score: 13 },
    { firstName: "Rich", lastName: "Feldtz", score: 8 }
  ];

  personsSorted = this.persons.sort((a, b) => b.score - a.score);
  constructor(
    private store: AngularFirestore,
    public authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.userService.getCurrentUser().subscribe(user => {
      if (user.isNew) {
        this.router.navigate(['profile']);
      }
      this.user = user
    });
  }







}
