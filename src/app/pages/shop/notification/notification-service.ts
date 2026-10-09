import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

@Injectable({providedIn: "root"})
export class NotificationService {
    private message = new BehaviorSubject<string>("");
    message$ = this.message.asObservable();

    show(text: string){
        this.message.next(text);
        timer(2000).subscribe(() => this.message.next(""));    }
}
