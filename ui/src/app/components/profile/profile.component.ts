import { Component, OnInit } from '@angular/core';
import {ProfileService} from "src/app/services/profile.service";
import { Observable, Subscriber } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { stringify } from '@angular/compiler/src/util';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  employee={
    Emp_ID:"",
    FirstName:"",
    LastName:"",
    Email:"",
    Department:"",
    Position:"",
    Pay_Rate:0,
    Phone:0
  }

  onChange: any = (ts:any) => {this.employee=ts };

  constructor(private pService : ProfileService,public auth: AuthService, private router: Router,private _snackBar: MatSnackBar) {
    this.auth.isAuthenticated$.subscribe(res=>{
      if(!res){
      window.location.href="/index.html";
      }
    }) 
    this.updateEmail()
   }

  //  fetches the employee data from the database using employee ID
   fetchEmployee(): void{
    this.employee.Emp_ID=String(this.pService.Eid);
    let datacall = this.pService.get(this.employee.Emp_ID);
    datacall.subscribe((data:any)=>{
      console.log(data)
      this.employee={
        Emp_ID:data[0].empId,
        FirstName:data[0].firstName,
        LastName:data[0].lastName,
        Email:data[0].email,
        Department:data[0].department,
        Position:data[0].position,
        Pay_Rate:data[0].payRate,
        Phone:data[0].phone
      }
      this.onChange(this.employee)
      console.log("assigned",this.employee)
    }) 
   }

  ngOnInit(): void {
  }
  
  // Saves the model to the database
  save(){
    let data={
      empId:this.employee.Emp_ID,
      firstName:this.employee.FirstName,
      lastName:this.employee.LastName,
      email:this.employee.Email,
      department:this.employee.Department,
      position:this.employee.Position,
      payRate:this.employee.Pay_Rate,
      phone:this.employee.Phone
    };
    this.pService.update(this.employee.Emp_ID,data).subscribe(data=>{
      console.log("saved")
      this._snackBar.open("saved","cancel",{
        duration: 3000
      })
    }); 
  }

  // set the employee ID based on email address
  setEmpID(callback:any){
    this.auth.isAuthenticated$.subscribe(res=>{
      if(res){
        this.auth.user$.subscribe(res=>{
          let eml = res?.email ? res?.email:"";
          this.pService.getIDfromEmail(eml).subscribe(res2=>{
            this.pService.Eid=res2.empId
          })
        })
      }
    })
  }

  // Check if email is blank and starts the whole process for updating  employee
  updateEmail(){
    console.log("updating email"+this.employee.Email)
    if(this.employee.Email==""){
      console.log("updating email")
      this.auth.idTokenClaims$.subscribe(res=>{
        console.log(res)        
        this.employee.Email=String(res?.email)
        this.pService.getIDfromEmail(this.employee.Email).subscribe(res2=>{
          //console.log(res2)
          this.pService.Eid=res2.empId
          this.fetchEmployee()
        })
        
        this.onChange(this.employee)
      })
      
    }
    }
    
}
