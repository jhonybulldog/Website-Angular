import { Component , inject} from '@angular/core';
import { NotificationService } from './notification-service';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [AsyncPipe],
  selector: 'app-notification',
  styleUrl: './notification.css',
  templateUrl: './notification.html',
})
export class Notification {
  message$ = inject(NotificationService).message$
}
