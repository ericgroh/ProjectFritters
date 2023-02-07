import { Router } from '@angular/router';
import { Sheet } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-sheets',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.scss']
})
export class SheetsComponent implements OnInit {
  @Input() sheets$: Observable<Sheet[]>;
  displayedColumns: string[] = ['name', 'time', `participants`, `status`, `actions`];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sheets$.subscribe();
  }

  convertTime(time: string): string {
    return moment(time).calendar();
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

  open(id: string) {
    this.router.navigate([`sheets/${id}/update`]);
  }
}
