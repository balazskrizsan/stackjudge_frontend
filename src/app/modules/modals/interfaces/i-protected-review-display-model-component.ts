import {IReview} from '../../review/interfaces/i-review';

export interface IProtectedReviewDisplayModelComponent
{
    open(review: IReview): void;
}
