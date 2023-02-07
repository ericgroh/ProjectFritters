import { map, Observable } from 'rxjs';
import { PlayerService } from './../../shared/services/player.service';
import { FormGroup, FormControl, FormArray, FormBuilder, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/shared/models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  players$: Observable<Player[]>;

  newPlayerForm = new FormGroup({
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
  });

  something = this.fb.group({
    firstName: { value: null, disabled: true }
  })

  formArray$: Observable<FormArray>;


  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
  ) {

  }

  ngOnInit(): void {
    this.players$ = this.playerService.getAllPlayers();
    this.formArray$ = this.players$.pipe(
      map(players => this.fb.array(players.map(player => this.fb.group({
        id: player.id,
        playerName: { value: `${player.firstName} ${player.lastName}`, disabled: true },
        score: player.score
      }))))
    );
  }

  onSubmitNewPlayer(formGroupDirective: FormGroupDirective) {
    this.playerService.createPlayer(this.newPlayerForm.value);
    this.newPlayerForm.reset();
    formGroupDirective.resetForm();
  }

  updateAllScores(form: FormGroup) {
    this.playerService.updateScores(form.value);
  }

  addPlayer() {
    // this.playersFormArray.push(new FormControl(''));s
  }

}
