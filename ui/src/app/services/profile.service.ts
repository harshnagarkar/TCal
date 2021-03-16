import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:3000/api/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  Eid=0;

  get(Emp_ID:String): Observable<any> {
    console.log(`${baseUrl}/?eid=${Emp_ID}`);
    return this.http.get(`${baseUrl}/?eid=${Emp_ID}`);
  }


  update(Emp_ID:string, data:any): Observable<any> {
    return this.http.post(`${baseUrl}`, data);
  }

}
