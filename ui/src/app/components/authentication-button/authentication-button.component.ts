import { Component, OnInit } from '@angular/core';
////////////////////////////////////
import { AuthService } from '@auth0/auth0-angular';
import {ProfileService} from "src/app/services/profile.service";
///////////////////////////////////////////////
@Component({
  selector: 'app-authentication-button',
  templateUrl: './authentication-button.component.html',
  styles: [
    '{color: rgb(255, 255, 255); background-color: rgb(27, 155, 55);}'
  ]
})
export class AuthenticationButtonComponent implements OnInit {

  constructor(public auth: AuthService,private pService : ProfileService) { 
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

  ngOnInit(): void {

  }

}
