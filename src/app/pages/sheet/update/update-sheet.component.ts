import { doc } from '@angular/fire/firestore';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { SheetService } from '../../../shared/services/sheet.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, pipe, Observable, tap } from 'rxjs';
import { Prop, Sheet, Status, Choice, Entry } from 'src/app/shared/models';
import { PropDialogComponent } from 'src/app/shared/components/prop-dialog/prop-dialog.component';

@Component({
  selector: 'app-sheet',
  templateUrl: './update-sheet.component.html',
  styleUrls: ['./update-sheet.component.scss']
})
export class UpdateSheetComponent implements OnInit {
  displayedColumns: string[] = ['question', 'type'];
  question: string;
  type: string;
  sheet: Sheet;
  sheetId: string;
  status = Status;
  props: Prop[];

  constructor(
    private route: ActivatedRoute,
    private sheetService: SheetService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.sheetId = params[`id`];

      this.sheetService.getSheet(this.sheetId).snapshotChanges().pipe(
        map(c => ({ id: c.payload.id, ...c.payload.data() } as Sheet))
      ).subscribe(data => {
        this.sheet = data;
        if ((this.sheet.status == this.status.Pending) || (this.sheet.status == this.status.Finalized)) {
          this.checkStatus();
        }
      });

      this.sheetService.getProps(this.sheetId).snapshotChanges().pipe(
        map(changes => changes.map(c => ({ ...c.payload.doc.data() }) as Prop))
      ).subscribe((props: Prop[]) => {
        this.props = props
      });
    });

  }

  addProp() {
    const dialogRef = this.dialog.open(PropDialogComponent, {
      data: { question: this.question, type: this.type },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.sheetService.addProp(this.sheet, result as Prop);
      }
    });
  }

  finalizeProps() {
    this.sheet.status = Status.Finalized;
    this.sheetService.update(this.sheet);
  }

  removeProp() { }

  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.props, event.previousIndex, event.currentIndex);
    this.props.forEach((prop, index) => {
      prop.position = index;
      this.sheetService.updateSheetProp(this.sheetId, prop);
    })
  }

  // eventStarted(): boolean {
  //   return new Date().getTime() >= new Date(this.sheet?.eventTime).getTime();
  // }

  checkStatus() {
    console.log("checking status");
    const started = new Date().getTime() >= new Date(this.sheet?.eventTime).getTime();
    if (started && this.sheet.status == Status.Pending) {
      console.log("expired")
      this.sheet.status = Status.Expired;
      this.sheetService.update(this.sheet);
    } else if (started && this.sheet.status == Status.Finalized) {
      console.log("in progress");
      this.sheet.status = Status.InProgress;
      this.sheetService.update(this.sheet);
    } else {
      console.log("setting timeout")
      setTimeout(this.checkStatus, 3000);
    }
  }

  saveSheetPropAnswer(prop: Prop, option: Choice) {
    prop.answer = option;
    this.sheetService.updateSheetProp(this.sheetId, prop);
    this.sheetService.updateEntries(this.sheet.id, prop.id, prop.answer);

  }

  completeKey() {
    this.sheet.status = Status.Completed;
    this.sheetService.update(this.sheet);
  }

  GoToScoring() {
    this.router.navigate([`sheets/${this.sheet.id}`]);
  }

  hasTieBreaker(): boolean {
    return this.sheet.tieBreaker != null;
  }

  addTieBreaker() {
    const dialogRef = this.dialog.open(PropDialogComponent, {
      data: { question: this.question, type: this.type },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.sheetService.addTieBreaker(this.sheet, result as Prop);
      }
    });
  }

  saveTieBreakerAnswer(answer: number) {
    this.sheet.tieBreaker.answer = answer;
    this.sheetService.update(this.sheet);
    this.sheetService.updateEntriesTieBreaker(this.sheet.id, answer);

  }

}
