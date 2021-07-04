import {NotificationTypeEnum} from '../enums/notification-type-enum';

export interface INotification {
  id?: number;
  userId: number;
  type: NotificationTypeEnum;
  data: {};
  createdAt: string;
  viewedAt?: string;
}
