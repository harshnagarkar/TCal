import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class IdentifierService {

  decodeToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  constructor(private auth: AuthService) { }
  token:any
  decode:any
  
  getIdentifier() : string {
    // let decode=""
    // this.auth.idTokenClaims$.subscribe(res=>{
    //   decode=res?.sub
    //   console.log("subject"+res?.sub)
    //   return String(res?.sub)
    // })
    // return decode
    this.auth.getAccessTokenSilently().subscribe(token => {this.token = token});
    console.log("the token is "+this.token)
    this.token = this.decodeToken(this.token);
    // console.log(this.token)
    //console.log("FULL:",this.token)
    if (this.token != null) {
      this.decode = this.token.sub;
      //console.log("ID ONLY:",this.decode)
      return this.decode
    } else {
      //console.log("TOKEN ERROR")
      return "ERROR"
    }
  }
}
