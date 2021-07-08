import {Injectable} from '@angular/core';
import {NotificationRepository} from '../repositories/notification-repository';
import {NotificationSearchLimitEnum} from '../notification-search-limit-enum';
import {Observable} from 'rxjs';
import {IResponseEntity} from '../../../interfaces/i-response-entity';
import {INotificationResponse} from '../interfaces/i-notification-response';

@Injectable()
export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {
  }

  public searchMyNotifications(limit: NotificationSearchLimitEnum = NotificationSearchLimitEnum.DEFAULT):
    Observable<IResponseEntity<INotificationResponse>> {
    return this.notificationRepository.searchMyNotifications(limit);
  }

  public markAsRead(id: number): Observable<IResponseEntity<boolean>> {
    return this.notificationRepository.markAsRead(id);
  }

  public delete(id: number): Observable<IResponseEntity<boolean>> {
    return this.notificationRepository.del(id);
  }
}
