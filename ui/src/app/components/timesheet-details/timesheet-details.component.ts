import { Component, OnInit } from '@angular/core';
import { TimesheetsService } from 'src/app/services/timesheets.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-timesheet-details',
  template: `
  <div style="width: 400px; margin: auto;">
  <a routerLink="/timesheets"><button class="btn btn-success pull-right" > 
  Back to Timesheet List
  </button></a>
  <br>
  <br>
  <div style="width: 400px; margin: auto;">
  <div *ngIf="currentTimesheet" class="edit-form">
  <mat-card>
    <h1>Timesheet</h1>
    <form>
      <div class="form-group">
        <label for="Month">Date</label>
        <input
          type="date"
          class="form-control"
          id="Month"
          [(ngModel)]="currentTimesheet.Month"
          name="Month"
        />
      </div>
      <div class="form-group">
        <label for="TimeIn">Time In</label>
        <input
          type="text"
          class="form-control"
          id="TimeIn"
          type="time"
          [(ngModel)]="currentTimesheet.TimeIn"
          name="TimeIn"
        />
      </div>
      <div class="form-group">
        <label for="TimeOut">Time Out</label>
        <input
          type="text"
          class="form-control"
          id="TimeOut"
          type="time"
          [(ngModel)]="currentTimesheet.TimeOut"
          name="TimeOut"
        />
      </div>
      <div class="form-group">
      <label for="NumHours">Hours</label>
      <input
        class="form-control"
        id="NumHours"
        type="number" 
        step="0.01"
        [(ngModel)]="currentTimesheet.NumHours"
        name="NumHours"
      />
    </div>
    </form>

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
    </mat-card>
  </div>

  <div *ngIf="!currentTimesheet">
  <mat-card>
    <br />
    <p>Cannot access this Timesheet...</p>
    </mat-card>
    </div>
</div>  

`,
  styles: [
    'input {color: rgb(6, 134, 128);}'
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
        },
        error => {
          console.log(error);
        });
  }

  updateCurrent(status:any): void {
    const data = {
      TimeIn: this.currentTimesheet.TimeIn,
      TimeOut: this.currentTimesheet.TimeOut,
      NumHours: this.currentTimesheet.NumHours
    };
    this.timesheetService.update(this.currentTimesheet._id, data)
      .subscribe(
        response => {
          this.currentTimesheet.current = status;
        },
        error => {
          console.log(error);
        });
  }

  updateTimesheet(): void {
    this.timesheetService.update(this.currentTimesheet._id, this.currentTimesheet)
      .subscribe(
        response => {
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
          this.router.navigate(['/timesheets']);
        },
        error => {
          console.log(error);
        });
  }
}