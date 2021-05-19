import { Component, OnInit } from '@angular/core';
import { TimesheetsService } from 'src/app/services/timesheets.service';
import { ProfileService } from "src/app/services/profile.service";
import { IdentifierService } from "src/app/services/identifier.service"
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';

export interface TimesheetElement {
  Month: string;
  TimeIn: string;
  TimeOut: String;
  NumHours: number;
  Edit: object;
}

@Component({
  selector: 'app-timesheets-list',
  template: `
  <br>
  <div class="list row">
  <div class="col-md-6">
  
  <div *ngIf="currentTimesheet">
  <mat-card>
    <h4>Timesheet</h4>
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

    <a class="badge badge-warning" routerLink="/timesheets/{{ currentTimesheet._id }}">
      Edit
    </a>
    </mat-card>
  </div>
  

  <a routerLink="/add"><button class="btn btn-success pull-right" > 
  Add New Timesheet
  </button></a>
  </div>
  <table mat-table [dataSource]="timesheets" class="mat-elevation-z8">
	<ng-container matColumnDef="Month">
      <th mat-header-cell *matHeaderCellDef> Month </th>
      <td mat-cell *matCellDef="let element"> {{element.Month}} </td>
    </ng-container>
  
  <ng-container matColumnDef="TimeIn">
    <th mat-header-cell *matHeaderCellDef> TimeIn </th>
    <td mat-cell *matCellDef="let element"> {{element.TimeIn}} </td>
  </ng-container>
  
  <!-- Weight Column -->
  <ng-container matColumnDef="TimeOut">
    <th mat-header-cell *matHeaderCellDef> TimeOut </th>
    <td mat-cell *matCellDef="let element"> {{element.TimeOut}} </td>
  </ng-container>


  <ng-container matColumnDef="NumHours">
  <th mat-header-cell *matHeaderCellDef> NumHours </th>
  <td mat-cell *matCellDef="let element"> {{element.NumHours}} </td>
</ng-container>

<ng-container matColumnDef="Edit">
<th mat-header-cell *matHeaderCellDef> Edit </th>
<td mat-cell *matCellDef="let element"> <button mat-button color="accent" (click)="setActiveTimesheet(element)" >Edit</button>  </td>
</ng-container>

<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>


      

      <style>
      table {
        width: 100%;
      }
      td{
        width: 8em;
      }
      </style>

  

 
    
  `,
  styles: [
    'h4 {color: rgb(2, 128, 8); font-weight: bold; font-size: large; margin: 15px;}',
    'li {color: rgb(6, 134, 128); font-weight: bold;}',
    'label {color: rgb(6, 134, 128); margin-right: 1px;}',
  ]
})
export class TimesheetsListComponent implements OnInit {

  timesheets: any;
  currentTimesheet: any = null;
  currentIndex = -1;
  EmpName = '';
  loginId = String(this.pService.Eid);
  msgs: any[] = [];
  // subscription: Subscription;
  displayedColumns: string[] = ['Month', 'TimeIn', 'TimeOut', 'NumHours', 'Edit'];
  userid: any;
  // constructor(private pService : ProfileService,private timesheetService: TimesheetsService, private interactionService: InteractionService) { 
  // displayedColumns: string[] = ['Month','TimeIn','TimeOut','NumHours'];

  constructor(public pService: ProfileService, private timesheetService: TimesheetsService, public identifier: IdentifierService, private auth: AuthService, private router: Router ) {
    this.userid = this.identifier.getIdentifier();
  }

  ngOnInit(): void {

    this.auth.isAuthenticated$.subscribe(res=>{
      if(!res){
        this.router.navigate(['/'])
      }
    },err=>{
    })

    this.retrieveTimesheets();

    console.log(this.userid)
  }

  retrieveTimesheets(): void {
    console.log("Userid", this.userid)
      let counter=1
      this.auth.idTokenClaims$.subscribe(res=>{
        console.log(res?.sub+" "+counter)
        // this.timesheetService.getEmpName("")
        this.timesheetService.getEmpName(res?.sub)
        .subscribe(
          (data: any) => {
            this.timesheets = data;
            console.log(this.timesheets)
          },
          (error: any) => {
            console.log(error);
          });

      })
      

    // console.log("EID"+this.pService.Eid)

  }

  refreshList(): void { //not needed anymore?
    this.retrieveTimesheets();
    this.currentTimesheet = null;
    this.currentIndex = -1;
  }

  // setActiveTimesheet(timesheet:any, index:any): void {
  //   this.currentTimesheet = timesheet;
  //   this.currentIndex = index;
  // }

  setActiveTimesheet(timesheet: any) {
      this.currentTimesheet = timesheet;
  }

  removeAllTimesheets(): void { //not needed
    this.timesheetService.deleteAll()
      .subscribe(
        (response: any) => {
          this.retrieveTimesheets();
        },
        (error: any) => {
          console.log(error);
        });
  }

  searchName(): void { //not needed anymore
    this.timesheetService.findByName(this.EmpName)
      .subscribe(
        (data: any) => {
          this.timesheets = data;
        },
        (error: any) => {
          console.log(error);
        });
  }

  ngOnDestroy() {
  }

}
