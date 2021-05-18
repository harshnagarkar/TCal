import { Component, OnInit } from '@angular/core';
import { TimesheetsService } from 'src/app/services/timesheets.service';
import {ProfileService} from "src/app/services/profile.service";
import {IdentifierService} from "src/app/services/identifier.service"

@Component({
  selector: 'app-timesheets-list',
  template: `
  <br>
  <div class="list row">

  <div class="col-md-6">
    <h4>All Entries</h4>
    <div *ngFor="let timesheet of timesheets; let i = index">
    <ul class="list-group">
      <li
        class="list-group-item"
        *ngIf="timesheet.EmpName == this.userid"
        [class.active]="i == currentIndex"
        (click)="setActiveTimesheet(timesheet, i)"
      >
        {{ timesheet.Month }}
      </li>
    </ul>
    </div>

    <a routerLink="/add"><button class="btn btn-success pull-right" > 
    Add New Entry
    </button></a>

  </div>

  <div class="col-md-6">
    <div *ngIf="currentTimesheet">
      <h4>Entry Details</h4>
      <div>
        <label><strong>CSU Chico ID Number:</strong></label>
        {{ currentTimesheet.Emp_ID }}
      </div>
      <div>
        <label><strong>Time In:</strong></label>
        {{ currentTimesheet.TimeIn }}
      </div>
      <div>
        <label><strong>Time Out:</strong></label>
        {{ currentTimesheet.TimeOut }}
      </div>
      <div>
        <label><strong>Hours:</strong></label>
        {{ currentTimesheet.NumHours }}
      </div>
      <div>
        <label><strong>Month:</strong></label>
        {{ currentTimesheet.Month }}
      </div>
      <a routerLink="/timesheets/{{ currentTimesheet._id }}"><button style="padding:3px; width: 60px"> 
      Edit
      </button></a>
    </div>
    <div *ngIf="!currentTimesheet">
      <br />
      <p>Click on an entry to view details and edit.</p>
    </div>
  </div>
</div>
  `,
  styles: [
    'h4 {color: rgb(2, 128, 8); font-weight: bold; font-size: large; margin: 15px;}',
    'li {color: rgb(6, 134, 128); font-weight: bold;}',
    'label {color: rgb(6, 134, 128); margin-right: 1px;}',
  ]
})
export class TimesheetsListComponent implements OnInit {

  timesheets: any;
  currentTimesheet:any = null;
  currentIndex = -1;
  EmpName = '';
  userid = this.identifier.getIdentifier();
  loginId = String(this.pService.Eid);
  msgs: any[] = [];
  displayedColumns: string[] = ['Month','TimeIn','TimeOut','NumHours'];

  constructor(public pService : ProfileService,private timesheetService: TimesheetsService, public identifier: IdentifierService) { 
  }

  ngOnInit(): void {
    this.retrieveTimesheets();
    this.userid = this.identifier.getIdentifier()
  }

  retrieveTimesheets(): void {
    this.timesheetService.getAll()
      .subscribe(
        (data: any) => {
          this.timesheets = data;
        },
        (error: any) => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveTimesheets();
    this.currentTimesheet = null;
    this.currentIndex = -1;
  }

  setActiveTimesheet(timesheet:any, index:any): void {
    if (timesheet.EmpName == this.userid) { //Check token id - don't let request through if it's incorrect
        this.currentTimesheet = timesheet;
        this.currentIndex = index;
    } else {
        console.log("Error: Not Authorized")
    }
  }

  removeAllTimesheets(): void {
    this.timesheetService.deleteAll()
      .subscribe(
        (response:any) => {
          this.retrieveTimesheets();
        },
        (error:any) => {
          console.log(error);
        });
  }

  searchName(): void {
    this.timesheetService.findByName(this.EmpName)
      .subscribe(
        (data:any) => {
          this.timesheets = data;
        },
        (error:any) => {
          console.log(error);
        });
  }

  ngOnDestroy() {
  }

}
