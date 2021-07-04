import {INotification} from './i-notification';

export interface INotificationResponse {
  notifications: Array<INotification>;
  hasNew: boolean;
}
