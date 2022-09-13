import { Router } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { User } from './../../shared/models/user';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
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

  persons: Person[] = [
    { position: 1, name: "Pam Friedman", score: 11.5 },
    { position: 2, name: "Zack Joseph", score: 10 },
    { position: 3, name: "Kevin Factor", score: 8 },
    { position: 4, name: "Mike Chornak", score: 7.5 },
    { position: 5, name: "Jarrod Kalish", score: 6.5 },
    { position: 6, name: "Danny Karliak", score: 6.5 },
    { position: 7, name: "Alex Friedman", score: 8 },
    { position: 8, name: "Rome Crews", score: 8.5 },
    { position: 9, name: "Richard Feldtz", score: 8 },
    { position: 10, name: "Gavin Bridegum", score: 5 },
    { position: 11, name: "Anthony Rangel", score: 7.5 },
    { position: 12, name: "Dan Reilley", score: 9.5 },
    { position: 13, name: "Rich Feldtz", score: 4 }
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

export interface Person {
  position: number,
  name: string,
  score: number
};