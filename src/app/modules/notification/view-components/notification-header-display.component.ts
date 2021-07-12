import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account/services/account-service';
import {ICurrentUser} from '../../account/interfaces/i-current-user';
import {NotificationService} from '../services/notification-service';
import {INotificationResponse} from '../interfaces/i-notification-response';
import {interval, Subscription} from 'rxjs';
import {IDataProtectedReview} from '../interfaces/i-data-protected-review';
import {INotification} from '../interfaces/i-notification';
import {NotificationTypeEnum} from '../enums/notification-type-enum';

@Component({
  selector: 'app-notification-header-display',
  templateUrl: './views/header-display.html',
  styles: [
    '.control-icon .more-dropdown { padding: 0}',
    '.control-icon .mCustomScrollbar {overflow-y: auto}'
  ]
})
export class NotificationHeaderDisplayComponent implements OnInit {
  private user: ICurrentUser;
  private interval$ = interval(60000);
  private subscription: Subscription;

  notificationInfo: INotificationResponse = null;
  newCount = 0;

  public constructor(
    private accountService: AccountService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.accountService.getStateAsObservable$().subscribe(user => {
      this.user = user;
      this.loadNotifications();

      if (this.isLoggedIn()) {
        this.subscription = this.interval$.subscribe(() => this.loadNotifications());
      } else if (this.subscription instanceof Subscription) {
        this.subscription.unsubscribe();
        this.notificationInfo = null;
      }
    });
  }

  private loadNotifications(): void {
    this
      .notificationService
      .searchMyNotifications()
      .subscribe(n => {
        this.notificationInfo = n.data;
        this.updateView();
      });
  }

  private updateView(): void {
    this.newCount = this.notificationInfo.notifications.filter(n => n.viewedAt === null).length;
  }

  private isLoggedIn(): boolean {
    return this.user !== null;
  }

  isValidNotification(notification: INotification): boolean {
    if (notification.type === NotificationTypeEnum.PROTECTED_VIEW) {
      const data = notification.data as IDataProtectedReview;

      if (!data.viewerUserId) {
        return false;
      }
    }

    return true;
  }

  delete(id: number): void {
    this.notificationService.delete(id).subscribe();

    this.notificationInfo.notifications = this.notificationInfo.notifications.filter(n => n.id !== id);

    this.updateView();
  }

  markAsRead(id: number): void {
    this.notificationService.markAsRead(id).subscribe();

    this.notificationInfo.notifications.filter(n => n.id === id).pop().viewedAt = Date.now().toString();

    this.updateView();
  }
}
