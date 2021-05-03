import { Component, OnInit } from '@angular/core';
import { TimesheetsService } from 'src/app/services/timesheets.service';
import { InteractionService } from 'src/app/interaction.service';
import { ProfileComponent } from 'src/app/components/profile/profile.component'
import { Observable, Subscription } from 'rxjs';
/*import {
  test
} from 'src/app/components/profile/profile.component';
*/
@Component({
  selector: 'app-timesheets-list',
  template: `
    <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by EmpName"
          [(ngModel)]="EmpName"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            (click)="searchName()"
          >
            Search
          </button>
        <app-authentication-button></app-authentication-button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Timesheets List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let timesheet of timesheets; let i = index"
          [class.active]="i == currentIndex"
          (click)="setActiveTimesheet(timesheet, i)"
        >
          {{ timesheet.EmpName }}
        </li>
      </ul>

      <a routerLink="/add"><button class="btn btn-success pull-right" > 
      Add New Timesheet
      </button></a>

    </div>
    <div class="col-md-6">
      <div *ngIf="currentTimesheet">
        <h4>Timesheet</h4>
        <div>
          <label><strong>EmpName:</strong></label> {{ currentTimesheet.EmpName }}
        </div>
        <div>
          <label><strong>CSU Chico ID Number:</strong></label>
          {{ currentTimesheet.Emp_ID }}
        </div>
        <div>
          <label><strong>TimeIn:</strong></label>
          {{ currentTimesheet.TimeIn }}
        </div>
        <div>
          <label><strong>TimeOut:</strong></label>
          {{ currentTimesheet.TimeOut }}
        </div>
        <div>
          <label><strong>NumHours:</strong></label>
          {{ currentTimesheet.NumHours }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentTimesheet.current ? "Current" : "Pending" }}
        </div>

        <a class="badge badge-warning" routerLink="/timesheets/{{ currentTimesheet._id }}">
          Edit
        </a>
      </div>

      <div *ngIf="!currentTimesheet">
        <br />
        <p>Please click on a Timesheet...</p>
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
  msgs: any[] = [];
  subscription: Subscription;

  constructor(private timesheetService: TimesheetsService, private interactionService: InteractionService) { 

    this.subscription = this.interactionService.getMsg().subscribe((msg: any) => {
      if (msg) {
        console.log(msg);
      }
    });

  }

 
  ngOnInit(): void {
    this.retrieveTimesheets();
    this.interactionService.getMsg()
    //ProfileComponent.test.subscribe(x => console.log(x))
  }

  retrieveTimesheets(): void {
    this.timesheetService.getAll()
      .subscribe(
        (data: any) => {
          this.timesheets = data;
          console.log(data);
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
    this.currentTimesheet = timesheet;
    this.currentIndex = index;
  }

  removeAllTimesheets(): void {
    this.timesheetService.deleteAll()
      .subscribe(
        (response:any) => {
          console.log(response);
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
          console.log(data);
        },
        (error:any) => {
          console.log(error);
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
