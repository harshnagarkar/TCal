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

  Eid=0;

  get(Emp_ID:String): Observable<any> {
    console.log(`${baseUrl}/?eid=${Emp_ID}`);
    return this.http.get(`${baseUrl}/?eid=${Emp_ID}`, httpOptions);
  }

  getIDfromEmail(inemail:String): Observable<any> {
    console.log(`${baseUrl}/email/?email=${inemail}`);
    return this.http.get(`${baseUrl}/email/?email=${inemail}`, httpOptions);
  }

  update(Emp_ID:string, data:any): Observable<any> {
    return this.http.post(`${baseUrl}`, data, httpOptions);
  }

}
