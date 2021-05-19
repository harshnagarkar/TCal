import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*'
  })
};
const baseUrl = `${environment.apiUrl}/api/timesheets`;

@Injectable({
  providedIn: 'root'
})
export class TimesheetsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl, httpOptions);
  }

  getEmpName(ename:string): Observable<any> {
    return this.http.get(baseUrl+`/?EmpName=${ename}`, httpOptions);
  }

  get(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`, httpOptions);
  }

  create(data:any): Observable<any> {
    console.log("creating")
    return this.http.post(baseUrl, data, httpOptions);
  }

  update(id:any, data:any): Observable<any> {

    // Array.from(Object.keys(data)).forEach(function(key){
    //   console.log(key + ":" + data[key]);
    // })
    console.log(id+" "+data)

    return this.http.put(`${baseUrl}/${id}`, data, httpOptions);
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
