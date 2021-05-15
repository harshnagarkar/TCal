import { Component, OnInit } from '@angular/core';
import { TimesheetsService } from 'src/app/services/timesheets.service';
import {ProfileService} from "src/app/services/profile.service";
import {IdentifierService} from "src/app/services/identifier.service";

@Component({
  selector: 'app-add-timesheet',
  template: `
  <div style="width: 400px; margin: auto;">
  
  <a routerLink="/timesheets"><button class="btn btn-success pull-right" > 
  Back to Timesheet List
  </button></a><br><br>

  <div class="submit-form">
    <div *ngIf="!submitted">
      <div class="form-group">
        <label for="Month">Date</label>
        <input
          type="text"
          class="form-control"
          id="Month"
          required
          matInput [(ngModel)]="timesheet.Month"
          name="Month"
        />
      </div>
      <div class="form-group">
      <label for="TimeIn">Time In</label>
      <input
        class="form-control"
        id="TimeIn"
        required
        matInput [(ngModel)]="timesheet.TimeIn"
        name="TimeIn"
        />
      </div>
      <div class="form-group">
      <label for="TimeOut">Time Out</label>
      <input
        class="form-control"
        id="TimeOut"
        required
        matInput [(ngModel)]="timesheet.TimeOut"
        name="TimeOut"
        />
      </div>
      <div class="form-group">
      <label for="NumHours">Hours</label>
      <input
        class="form-control"
        id="NumHours"
        required
        matInput [(ngModel)]="timesheet.NumHours"
        name="NumHours"
        />
      </div>

      <button (click)="saveTimesheet()" class="btn btn-success">Submit Entry</button>
    </div>

    <div *ngIf="submitted">
      <h4>Changes submitted successfully!</h4>
      <button class="btn btn-success" (click)="newTimesheet()">Add</button>
    </div>
  </div>
</div>
  `,
  styles: [
  ]
})
export class AddTimesheetComponent implements OnInit {

  timesheet = {
    EmpName: '',
    Emp_ID: '',
    Month: '',
    TimeIn: '',
    TimeOut: '',
    NumHours: '',
    Identifier: ''
  };
  submitted = false;
  userID = this.identifier.getIdentifier();
  
  constructor(private timesheetService: TimesheetsService, private pService : ProfileService, public identifier: IdentifierService) { }

  ngOnInit(): void {
    //console.log("HERE IT IS:",this.userID);
  }

  saveTimesheet(): void {
    const data = {
      EmpName: this.userID,
      Emp_ID: this.pService.Eid,
      Month: this.timesheet.Month,
      TimeIn: this.timesheet.TimeIn,
      TimeOut: this.timesheet.TimeOut,
      NumHours: this.timesheet.NumHours,
      Identifier: this.userID
    };

    this.timesheetService.create(data)
      .subscribe(
        response => {
          //console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTimesheet(): void {
    this.submitted = false;
    this.timesheet = {
      EmpName: '',
      Emp_ID: '',
      Month: '',
      TimeIn: '',
      TimeOut: '',
      NumHours: '',
      Identifier: '',
    };
  }

}
