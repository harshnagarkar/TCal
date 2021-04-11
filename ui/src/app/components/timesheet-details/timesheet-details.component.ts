import { Component, OnInit } from '@angular/core';
import { TimesheetsService } from 'src/app/services/timesheets.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-timesheet-details',
  template: `
  <div style="width: 400px; margin: auto;">
  <div *ngIf="currentTimesheet" class="edit-form">
    <h4>Timesheet</h4>
    <form>
      <div class="form-group">
        <label for="EmpName">EmpName</label>
        <input
          type="text"
          class="form-control"
          id="EmpName"
          [(ngModel)]="currentTimesheet.EmpName"
          name="EmpName"
        />
      </div>
      <div class="form-group">
        <label for="Month">Month</label>
        <input
          type="text"
          class="form-control"
          id="Month"
          [(ngModel)]="currentTimesheet.Month"
          name="Month"
        />
      </div>
      <div class="form-group">
        <label for="Emp_ID">CSU Chico ID Number</label>
        <input
          type="text"
          class="form-control"
          id="Emp_ID"
          [(ngModel)]="currentTimesheet.Emp_ID"
          name="Emp_ID"
        />
      </div>
      <div class="form-group">
        <label for="TimeIn">TimeIn</label>
        <input
          type="text"
          class="form-control"
          id="TimeIn"
          [(ngModel)]="currentTimesheet.TimeIn"
          name="TimeIn"
        />
      </div>
      <div class="form-group">
        <label for="TimeOut">TimeOut</label>
        <input
          type="text"
          class="form-control"
          id="TimeOut"
          [(ngModel)]="currentTimesheet.TimeOut"
          name="TimeOut"
        />
      </div>
      <div class="form-group">
      <label for="NumHours">NumHours</label>
      <input
        type="text"
        class="form-control"
        id="NumHours"
        [(ngModel)]="currentTimesheet.NumHours"
        name="NumHours"
      />
    </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTimesheet.current ? "Current" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      *ngIf="currentTimesheet.current"
      (click)="updateCurrent(false)"
    >
      UnPublish
    </button>
    <button
      *ngIf="!currentTimesheet.current"
      class="badge badge-primary mr-2"
      (click)="updateCurrent(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" (click)="deleteTimesheet()">
      Delete
    </button>

    <button
      type="submit"
      class="badge badge-success"
      (click)="updateTimesheet()"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div *ngIf="!currentTimesheet">
    <br />
    <p>Cannot access this Timesheet...</p>
  </div>
</div>  `,
  styles: [
  ]
})
export class TimesheetDetailsComponent implements OnInit {
  currentTimesheet:any = null;
  message = '';

  constructor(
    private timesheetService: TimesheetsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getTimesheet(this.route.snapshot.paramMap.get('id'));
  }

  getTimesheet(id:any): void {
    this.timesheetService.get(id)
      .subscribe(
        data => {
          this.currentTimesheet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateCurrent(status:any): void {
    const data = {
      EmpName: this.currentTimesheet.EmpName,
      Emp_ID: this.currentTimesheet.Emp_ID,
      TimeIn: this.currentTimesheet.TimeIn,
      TimeOut: this.currentTimesheet.TimeOut,
      NumHours: this.currentTimesheet.NumHours,
      current: status
    };

    this.timesheetService.update(this.currentTimesheet._id, data)
      .subscribe(
        response => {
          this.currentTimesheet.current = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateTimesheet(): void {
    this.timesheetService.update(this.currentTimesheet._id, this.currentTimesheet)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The timesheet was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteTimesheet(): void {
    this.timesheetService.delete(this.currentTimesheet._id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/timesheets']);
        },
        error => {
          console.log(error);
        });
  }
}