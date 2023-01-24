import { PlayerService } from './../../shared/services/player.service';
import { Player, User } from './../../shared/models';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user!: User;
  displayedColumns: string[] = ['position', 'name', 'score'];

  players$: Observable<Player[]>;

  constructor(
    public authService: AuthService,
    private playerService: PlayerService,
  ) {
    this.players$ = this.playerService.getAllPlayers().pipe(
      map((players: Player[]) => players.sort((a, b) => b.score - a.score))
    );

  }







}
