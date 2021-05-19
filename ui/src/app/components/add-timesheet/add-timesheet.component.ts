import { Component, OnInit } from '@angular/core';
import { TimesheetsService } from 'src/app/services/timesheets.service';
import {ProfileService} from "src/app/services/profile.service";
import {IdentifierService} from "src/app/services/identifier.service";
import { AuthService } from '@auth0/auth0-angular';

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
  running=false;
  userID = this.identifier.getIdentifier();
  
  constructor(private auth: AuthService,private timesheetService: TimesheetsService, private pService : ProfileService, public identifier: IdentifierService) {
    console.log("userid",this.userID)
   }

  ngOnInit(): void {
    //console.log("HERE IT IS:",this.userID);
    console.log("reloading")
  }

  

  saveTimesheet(): void {
    
    console.log("inside")
  //   let promise = () => {
      
  //   let data= this.auth.idTokenClaims$.toPromise().
  //   then(res=>{
  //     console.log("id")
  //     return res
  //   }).catch(err=>{
  //     console.log(err)
  //     return err
  //   })
  //   console.log(data)
  // }
  // let ans
  // let errors
  // console.log(promise())

      
    //   idtoken=>{
    //   const data = {
    //     EmpName: idtoken?.sub,
    //     Emp_ID: this.pService.Eid,
    //     Month: this.timesheet.Month,
    //     TimeIn: this.timesheet.TimeIn,
    //     TimeOut: this.timesheet.TimeOut,
    //     NumHours: this.timesheet.NumHours,
    //     Identifier: idtoken?.sub
    //   };
  
    //   this.timesheetService.create(data).subscribe(res2=>{
    //     this.submitted=true
    //   },err2=>{
    //     console.log(err2)
    //   })
    // },err=>{console.log(err)});
    console.log("completed")
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
      console.log("completed2")
      // let s= async (data:any) => {
      //   await this.timesheetService.create(data).subscribe(res2=>{
      //     this.submitted=true
      //     console.log("saved ")
      //   },err2=>{
      //     console.log(err2)
      //   })  
      // }
      // s(data)
      this.timesheetService.create(data).subscribe(res2=>{
          this.submitted=true
          console.log("saved ")
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
