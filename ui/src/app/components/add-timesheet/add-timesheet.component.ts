import { Component, OnInit } from '@angular/core';
import { TimesheetsService } from 'src/app/services/timesheets.service';
import {ProfileService} from "src/app/services/profile.service";
import {IdentifierService} from "src/app/services/identifier.service";
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-add-timesheet',
  template: `
  <mat-card style="padding: 0.5em; margin-top: 2em;">
  <div style="width: 400px; margin: auto;">
  <a routerLink="/timesheets"><button class="btn btn-success pull-right" > 
  Back to Timesheet List
  </button></a><br><br>

  <div class="submit-form">
    <div *ngIf="!submitted">
      <div class="form-group">
        <label for="Month">Date</label>
        <input 
          matInput
          type="date"
          class="form-control"
          id="Month"
          required
          matInput [(ngModel)]="timesheet.Month"
          name="Month"
        />
      </div>
      <br>
      <div class="form-group">
      <label for="TimeIn">Time In</label>
      <input
        matInput
        class="form-control"
        type="time"
        id="TimeIn"
        required
        matInput [(ngModel)]="timesheet.TimeIn"
        name="TimeIn"
        />
      </div>
      <br>
      <div class="form-group">
      <label for="TimeOut">Time Out</label>
      <input
        matInput
        class="form-control"
        id="TimeOut"
        type="time"
        required
        matInput [(ngModel)]="timesheet.TimeOut"
        name="TimeOut"
        />
      </div>
      <br>
      <div class="form-group">
      <label for="NumHours">Hours</label>
      <input
        matInput
        class="form-control"
        id="NumHours"
        required
        type="number" 
        step="0.01"
        matInput [(ngModel)]="timesheet.NumHours"
        name="NumHours"
        />
      </div>
      <br>
      <button (click)="saveTimesheet()" class="btn btn-success">Submit Entry</button>
    </div>

    <div *ngIf="submitted">
      <h4>Changes submitted successfully!</h4>
      <button class="btn btn-success" (click)="newTimesheet()">Add</button>
    </div>
  </div>
</div>
</mat-card>
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
  running=false;
  userID = this.identifier.getIdentifier(); //get .sub from jwt token, assign to user id - AL 5/21/21
  
  constructor(private auth: AuthService,private timesheetService: TimesheetsService, private pService : ProfileService, public identifier: IdentifierService) {
   }

  ngOnInit(): void {
  }

  

  saveTimesheet(): void {
    let data
   this.auth.idTokenClaims$.subscribe(idtoken=>{
    if(!this.running){
      this.running=true
      data = {
        EmpName: idtoken?.sub,
        Emp_ID: this.pService.Eid,
        Month: this.timesheet.Month,
        TimeIn: this.timesheet.TimeIn,
        TimeOut: this.timesheet.TimeOut,
        NumHours: this.timesheet.NumHours,
        Identifier: idtoken?.sub
      };
      this.timesheetService.create(data).subscribe(res2=>{
          this.submitted=true
        },err2=>{
          console.log(err2)
        })  

    }
    },err=>{console.log(err)}
    )
  }

  newTimesheet(): void {
    this.submitted = false;
    this.running=false;
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
