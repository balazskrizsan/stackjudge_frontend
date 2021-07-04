import {Injectable} from '@angular/core';
import {AbstractApiRepository} from '../../../repositories/abstract-api-repository';
import {NotificationSearchLimitEnum} from '../notification-search-limit-enum';
import {Observable} from 'rxjs';
import {IResponseEntity} from '../../../interfaces/i-response-entity';
import {HttpService} from '../../../services/http-service';
import {INotificationResponse} from '../interfaces/i-notification-response';

@Injectable()
export class NotificationRepository extends AbstractApiRepository {
  constructor(httpService: HttpService) {
    super(httpService);
  }

  getController(): string {
    return 'notification';
  }

  public searchMyNotifications(limit: NotificationSearchLimitEnum = NotificationSearchLimitEnum.DEFAULT):
    Observable<IResponseEntity<INotificationResponse>> {
    return this.getWithoutId<INotificationResponse>([], {limit}, this.getController() + '/search-my-notifications');
  }
}
