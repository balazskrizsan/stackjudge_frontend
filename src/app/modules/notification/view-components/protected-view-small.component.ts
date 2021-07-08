import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDataProtectedReview} from '../interfaces/i-data-protected-review';
import {IUser} from '../../account/interfaces/i-user';
import {INotification} from '../interfaces/i-notification';

@Component({
  selector: 'app-notification-protected-view-small',
  templateUrl: './views/protected-view-small.html',
  styleUrls: ['./styles/protected-view-small.scss']
})
export class NotificationProtectedViewSmallComponent implements OnInit {
  @Output() markAsReadEvent = new EventEmitter<number>();
  @Input() notification: INotification;
  @Input() users: Array<IUser>;
  data: IDataProtectedReview = null;
  viewUser: IUser = null;

  ngOnInit(): void {
    if (this.notification.data) {
      this.data = this.notification.data as IDataProtectedReview;
      this.viewUser = this.users[this.data.viewerUserId] || null;
    }
  }

  markAsRead(id: number): void {
    this.markAsReadEvent.emit(id);
  }
}
