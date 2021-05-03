import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*'
  })
};
const baseUrl = 'http://localhost:3000/api/timesheets';

@Injectable({
  providedIn: 'root'
})
export class TimesheetsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl, httpOptions);
  }

  get(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`, httpOptions);
  }

  create(data:any): Observable<any> {
    return this.http.post(baseUrl, data, httpOptions);
  }

  update(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, httpOptions, data);
  }

  delete(id:any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, httpOptions);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl, httpOptions);
  }

  findByName(EmpName:String): Observable<any> {
    return this.http.get(`${baseUrl}?EmpName=${EmpName}`, httpOptions);
  }
}
