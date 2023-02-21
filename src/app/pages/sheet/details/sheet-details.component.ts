import { EntryService } from './../../../shared/services/entry.service';
import { UserService } from 'src/app/shared/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SheetService } from '../../../shared/services/sheet.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Prop, Sheet, Entry } from 'src/app/shared/models';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-sheet',
  templateUrl: './sheet-details.component.html',
  styleUrls: ['./sheet-details.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SheetComponent {
  displayedColumns: string[] = ['question', 'type'];
  question: string;
  type: string;
  sheet: Sheet;
  entries: Entry[]
  sheetId: string;
  isOwner: boolean;
  props: Prop[];
  loading: boolean = false;
  columnsToDisplayWithExpand = ['index', 'user', 'score', 'tieBreakerScore', 'expand'];
  expandedEntry: Entry | null;

  constructor(
    private route: ActivatedRoute,
    private sheetService: SheetService,
    private entryService: EntryService,
    private userService: UserService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.route.params.subscribe(params => {
      this.sheetId = params[`id`];
    });

    this.sheetService.getSheet(this.sheetId).snapshotChanges().pipe(
      map(c => ({ id: c.payload.id, ...c.payload.data() } as Sheet))
    ).subscribe(data => {
      this.sheet = data;
      this.isOwner = this.userService.getCurrentUserId() == this.sheet.ownerId
    });

    this.entryService.getEntries(this.sheetId).snapshotChanges().pipe(
      map(changes => changes.map(c => ({ ...c.payload.doc.data() }) as Entry))
    ).subscribe(entries => {
      this.entries = entries.sort((a, b) => {
        if (a.score == b.score) {
          return a.tieBreakerScore - b.tieBreakerScore
        }
        else {
          return b.score - a.score
        }
      });

    })
  };

  update() {
    this.router.navigate([`sheets/${this.sheetId}/update`]);
  }

  getEntryProps(entryId: string) {
    this.props = [];
    this.entryService.getEntryProps(entryId).snapshotChanges().pipe(
      map(changes => changes.map(c => ({ ...c.payload.doc.data() }) as Prop))
    ).subscribe(props => {
      this.props = props;
    });
  }

  getStatus(n: number) {
    let status = "";
    switch (n) {
      case 0:
        status = "Pending"
        break;
      case 1:
        status = "Finalized"
        break;
      case 2:
        status = "In Progress"
        break;
      case 3:
        status = "Completed"
        break;
      case 4:
        status = "Expired"
        break;
      default:
        status = "Unknown"
        break;
    }
    return status;
  }
}
