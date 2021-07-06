import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account/services/account-service';
import {ICurrentUser} from '../../account/interfaces/i-current-user';
import {NotificationService} from '../services/notification-service';
import {interval, Subscription} from 'rxjs';
import {INotificationResponse} from '../interfaces/i-notification-response';

@Component({
  selector: 'app-notification-header-display',
  templateUrl: './views/header-display.html',
})
export class HeaderDisplayComponent implements OnInit {
  private user: ICurrentUser;
  private interval$ = interval(30000);
  private subscription: Subscription;

  notificationInfo: INotificationResponse = null;

  public constructor(
    private accountService: AccountService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.accountService.getStateAsObservable$().subscribe(user => {
      this.user = user;

      if (this.isLoggedIn()) {
        this.subscription = this
          .interval$
          .subscribe(() => this
            .notificationService
            .searchMyNotifications()
            .subscribe(n => this.notificationInfo = n.data)
          );
      } else if (this.subscription instanceof Subscription) {
        this.subscription.unsubscribe();
        this.notificationInfo = null;
      }
    });
  }

  public isLoggedIn(): boolean {
    return this.user !== null;
  }
}
