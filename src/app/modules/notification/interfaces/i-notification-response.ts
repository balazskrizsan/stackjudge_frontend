import {INotification} from './i-notification';
import {IUser} from '../../account/interfaces/i-user';

export interface INotificationResponse {
  notifications: Array<INotification>;
  hasNew: boolean;
  newCount: number;
  users: Array<IUser>;
}
