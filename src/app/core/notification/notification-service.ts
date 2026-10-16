import { Injectable } from "@angular/core";
import { BehaviorSubject, timer } from "rxjs";

export interface toast {
  text: string;
  iserror: boolean;
}

@Injectable({ providedIn: "root" })
export class NotificationService {
  private message = new BehaviorSubject<toast | null>(null);
  message$ = this.message.asObservable();

  show(text: string, iserror: boolean) {
    this.message.next({ text, iserror });
    timer(2000).subscribe(() =>
      this.message.next( null ),
    );
  }
}
