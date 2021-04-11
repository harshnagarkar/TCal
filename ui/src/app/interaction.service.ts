import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private _EmpIdSource = new Subject<String>();
  sourceMsg$ = this._EmpIdSource.asObservable();
  constructor() { }
  sendMessage(msg: string) {
    this._EmpIdSource.next(msg);
  }
}
