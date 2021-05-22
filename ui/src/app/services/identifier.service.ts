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
    this.auth.getAccessTokenSilently().subscribe(token => {this.token = token});
    this.token = this.decodeToken(this.token);
    if (this.token != null) {
      this.decode = this.token.sub;
      return this.decode
    } else {
      return "NULL"
    }
  }
}
