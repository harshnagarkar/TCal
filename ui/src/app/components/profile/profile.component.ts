import { Component, OnInit } from '@angular/core';
import {ProfileService} from "src/app/services/profile.service";
import { InteractionService } from 'src/app/interaction.service';
import { Observable, Subscriber } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { stringify } from '@angular/compiler/src/util';

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

  sendMsg(): void {
    this.interactionService.sendMsg('testing testing!');
  }

  constructor(private pService : ProfileService, private interactionService: InteractionService,public auth: AuthService) {
    this.auth.isAuthenticated$.subscribe(res=>{
      if(!res){
      window.location.href="/index.html";
      }
    })
    
    this.employee.Emp_ID=String(this.pService.Eid);
    let datacall = pService.get(this.employee.Emp_ID);
    datacall.subscribe((data:any)=>{

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
      console.log("assigned",this.employee)
    })

   }

  ngOnInit(): void {
    this.sendMsg()
  }
  
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
    });
    
  }
}
