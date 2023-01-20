import { PlayerService } from './../../shared/services/player.service';
import { Player } from './../../shared/models/player';
import { Router } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { User } from './../../shared/models/user';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, map } from 'rxjs';
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

  players$: Observable<Player[]>;

  // personsSorted = this.players$.sort((a, b) => b.score - a.score);
  constructor(
    private store: AngularFirestore,
    public authService: AuthService,
    private playerService: PlayerService,
    private router: Router
  ) {
    this.players$ = this.playerService.getAllPlayers().pipe(
      map((players: Player[]) => players.sort((a, b) => b.score - a.score))
    );
    // this.userService.getCurrentUser().subscribe(user => {
    //   if (user.isNew) {
    //     this.router.navigate(['profile']);
    //   }
    //   this.user = user
    // });
  }







}
