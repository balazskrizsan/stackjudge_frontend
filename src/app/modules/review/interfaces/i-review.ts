import {VisibilityEnum} from '../enums/visibility-enum';

export interface IReview {
  id?: number;
  groupId: number;
  visibility: VisibilityEnum;
  rate: number;
  review: string;
}
