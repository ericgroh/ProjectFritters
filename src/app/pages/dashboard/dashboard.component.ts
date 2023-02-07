import { SheetService } from 'src/app/shared/services/sheet.service';
import { Sheet } from 'src/app/shared/models';
import { UserService } from 'src/app/shared/services/user.service';
import { PlayerService } from '../../shared/services/player.service';
import { Player, User } from '../../shared/models';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: User;
  sheets$: Observable<Sheet[]>;
  displayedColumns: string[] = ['position', 'name', 'score'];
  players$: Observable<Player[]>;
  show: Table
  public table = Table;


  constructor(
    public authService: AuthService,
    private userService: UserService,
    private sheetService: SheetService,
  ) {
    this.userService.getCurrentUser().snapshotChanges().pipe(
      map(c => ({ uid: c.payload.id, ...c.payload.data() }) as User)
    ).subscribe(data => {
      this.user = data
      return this.sheets$ = this.sheetService.getUserSheets(this.user.uid).snapshotChanges().pipe(
        map(changes => changes.map(c => c.payload.doc.data()))
      )
    });
  }

  showTable(table: Table) {
    this.show = table
  }


}


enum Table {
  sheets,
  entries
}