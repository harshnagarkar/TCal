import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*'
  })
};
const baseUrl = `${environment.apiUrl}/api/profile`;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  // Public variable that stores the Employee ID
  Eid=(-1);

  // Gets that data for a particular empoyee based on ID
  get(Emp_ID:String): Observable<any> {
    return this.http.get(`${baseUrl}/?eid=${Emp_ID}`, httpOptions);
  }

  // Gets the ID from a employee based on Email
  getIDfromEmail(inemail:String): Observable<any> {
    return this.http.get(`${baseUrl}/email/?email=${inemail}`, httpOptions);
  }

  // Updates the employee details based on the ID
  update(Emp_ID:string, data:any): Observable<any> {
    return this.http.post(`${baseUrl}`, data, httpOptions);
  }

}
