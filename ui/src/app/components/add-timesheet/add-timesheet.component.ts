import { Component, OnInit } from '@angular/core';
import { TimesheetsService } from 'src/app/services/timesheets.service';

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
        <label for="EmpName">EmpName</label>
        <input
          type="text"
          class="form-control"
          id="EmpName"
          required
          matInput [(ngModel)]="timesheet.EmpName"
          name="EmpName"
        />
      </div>
      <div class="form-group">
        <label for="Month">Month</label>
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
        <label for="Emp_ID">CSU Chico ID #</label>
        <input
          class="form-control"
          id="Emp_ID"
          required
          matInput [(ngModel)]="timesheet.Emp_ID"
          name="Emp_ID"
        />
      </div>
      <div class="form-group">
      <label for="TimeIn">TimeIn</label>
      <input
        class="form-control"
        id="TimeIn"
        required
        matInput [(ngModel)]="timesheet.TimeIn"
        name="TimeIn"
        />
      </div>
      <div class="form-group">
      <label for="TimeOut">TimeOut</label>
      <input
        class="form-control"
        id="TimeOut"
        required
        matInput [(ngModel)]="timesheet.TimeOut"
        name="TimeOut"
        />
      </div>
      <div class="form-group">
      <label for="NumHours">NumHours</label>
      <input
        class="form-control"
        id="NumHours"
        required
        matInput [(ngModel)]="timesheet.NumHours"
        name="NumHours"
        />
      </div>

      <button (click)="saveTimesheet()" class="btn btn-success">Submit</button>
    </div>

    <div *ngIf="submitted">
      <h4>You submitted successfully!</h4>
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
    current: false
  };
  submitted = false;

  constructor(private timesheetService: TimesheetsService) { }

  ngOnInit(): void {
  }

  saveTimesheet(): void {
    const data = {
      EmpName: this.timesheet.EmpName,
      Emp_ID: this.timesheet.Emp_ID,
      Month: this.timesheet.Month,
      TimeIn: this.timesheet.TimeIn,
      TimeOut: this.timesheet.TimeOut,
      NumHours: this.timesheet.NumHours,
      current: this.timesheet.current
    };

    this.timesheetService.create(data)
      .subscribe(
        response => {
          console.log(response);
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
      current: false
    };
  }

}
