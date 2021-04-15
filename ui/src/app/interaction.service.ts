import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InteractionService {
    private subject = new Subject<any>();

    sendMsg(msg: string) {
        this.subject.next({ text: msg });
    }

    getMsg(): Observable<any> {
        return this.subject.asObservable();
    }
}