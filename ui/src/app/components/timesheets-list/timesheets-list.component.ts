import { Component, OnInit } from '@angular/core';
import { TimesheetsService } from 'src/app/services/timesheets.service';
import { InteractionService } from 'src/app/interaction.service';
import { Subscription } from 'rxjs';
import {ProfileService} from "src/app/services/profile.service";
import {IdentifierService} from "src/app/services/identifier.service"
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-timesheets-list',
  template: `

  <div class="list row">

  <app-authentication-button></app-authentication-button>

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
      <a class="badge badge-warning" routerLink="/timesheets/{{ currentTimesheet._id }}">
        Edit
      </a>
    </div>
    <div *ngIf="!currentTimesheet">
      <br />
      <p>Click on an entry to view details.</p>
    </div>
  </div>
</div>
  `,
  styles: [
    
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
  subscription: Subscription;
  displayedColumns: string[] = ['Month','TimeIn','TimeOut','NumHours'];

  constructor(public pService : ProfileService,private timesheetService: TimesheetsService, private interactionService: InteractionService, public identifier: IdentifierService) { 

    this.subscription = this.interactionService.getMsg().subscribe((msg: any) => {
      if (msg) {
        console.log(msg);
      }
    });

  }

  ngOnInit(): void {
    this.retrieveTimesheets();
    this.interactionService.getMsg()
    this.userid = this.identifier.getIdentifier()
    //console.log("ID is:",this.userid);
  }

  editEntry(): void {
    console.log("click!")
  }

  retrieveTimesheets(): void {
    this.timesheetService.getAll()
      .subscribe(
        (data: any) => {
          this.timesheets = data;
          //console.log(data);
        },
        (error: any) => {
          console.log(error);
        });
      //console.log("EID"+this.loginId)
  }

  refreshList(): void {
    this.retrieveTimesheets();
    this.currentTimesheet = null;
    this.currentIndex = -1;
  }

  setActiveTimesheet(timesheet:any, index:any): void {
    this.currentTimesheet = timesheet;
    this.currentIndex = index;
  }

  removeAllTimesheets(): void {
    this.timesheetService.deleteAll()
      .subscribe(
        (response:any) => {
          //console.log(response);
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
          //console.log(data);
        },
        (error:any) => {
          console.log(error);
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
