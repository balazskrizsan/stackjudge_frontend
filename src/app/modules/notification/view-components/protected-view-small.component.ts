import {Component, Input, OnInit} from '@angular/core';
import {IDataProtectedReview} from '../interfaces/i-data-protected-review';
import {IUser} from '../../account/interfaces/i-user';

@Component({
  selector: 'app-notification-protected-view-small',
  templateUrl: './views/protected-view-small.html',
  styleUrls: ['./styles/protected-view-small.scss']
})
export class NotificationProtectedViewSmallComponent implements OnInit {
  @Input() data: IDataProtectedReview;
  @Input() user: IUser;

  public constructor() {
  }

  ngOnInit(): void {
  }
}
