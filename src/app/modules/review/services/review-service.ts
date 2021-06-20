import {Injectable} from '@angular/core';
import {IReview} from '../interfaces/i-review';
import {ReviewRepository} from '../repositories/review-repository';
import {Observable} from 'rxjs';
import {IResponseEntity} from '../../../interfaces/i-response-entity';

@Injectable()
export class ReviewService {
  public constructor(private reviewRepository: ReviewRepository) {
  }

  public create(review: IReview): Observable<IResponseEntity<null>> {
    return this.reviewRepository.create(review);
  }
}
