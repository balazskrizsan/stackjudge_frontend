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
  @Output()
  public markAsReadEvent = new EventEmitter<number>();
  @Output()
  public deleteEvent = new EventEmitter<number>();
  @Input()
  public notification: INotification;
  @Input()
  public users: Array<IUser>;
  public data: IDataProtectedReview = null;
  public viewUser: IUser = null;

  public ngOnInit(): void {
    if (this.notification.data) {
      this.data = this.notification.data as IDataProtectedReview;
      this.viewUser = this.users[this.data.viewerUserId] || null;
    }
  }

  public markAsRead(id: number): void {
    this.markAsReadEvent.emit(id);
  }

  public delete(id: number): void {
    this.deleteEvent.emit(id);
  }
}
