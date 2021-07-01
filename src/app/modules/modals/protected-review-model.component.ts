import {Component, OnInit} from '@angular/core';
import {ModalService} from './model-service';
import {IModal} from './interfaces/i-modal';
import {ModalIdEnum} from './enums/modal-id-enum';
import {IReview} from '../review/interfaces/i-review';
import {AccountService} from '../account/services/account-service';
import {IProtectedReviewConfig} from './interfaces/i-protected-review-config';
import {IUser} from '../account/interfaces/i-user';

@Component({
  selector: 'app-tracked-review-display-modal',
  templateUrl: './views/protected-review-display-modal.html',
})
export class ProtectedReviewModelComponent implements IModal, OnInit {
  public id: number;

  isModalVisible = false;
  review: IReview;
  user: IUser = null;

  constructor(
    private modalService: ModalService,
    private accountService: AccountService
  ) {
    this.id = ModalIdEnum.PROTECTED_REVIEW_DISPLAY;
  }

  public ngOnInit(): void {
    this.modalService.add(this);
  }

  public open(config: IProtectedReviewConfig): void {
    this.isModalVisible = true;
    this.review = { ...config.review};
  }

  public close(): void {
    this.isModalVisible = false;
    this.reset();
  }

  public reset(): void {
    this.user = null;
  }

  public loadUserForReview(): void {
    this.review.visibility = 1;
    this.accountService.getUserByReviewId(this.review.id).subscribe(res => {
      this.user = res.data;
    });
  }
}
