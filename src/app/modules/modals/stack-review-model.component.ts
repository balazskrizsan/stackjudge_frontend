import {Component, OnInit} from '@angular/core';
import {ModalService} from './model-service';
import {IModal} from './interfaces/i-modal';
import {ModalIdEnum} from './enums/modal-id-enum';
import {AccountService} from '../account/services/account-service';
import {ICurrentUser} from '../account/interfaces/i-current-user';
import {FormGroup} from '@angular/forms';
import {StackReviewForm} from './forms/stack-review-form';
import {ReviewService} from '../review/services/review-service';
import {IWriteGroupReviewConfig} from './interfaces/i-write-group-review-config';

@Component({
  selector: 'app-stack-review-modal',
  templateUrl: './views/stack-review.html',
  providers: [StackReviewForm]
})
export class StackReviewModelComponent implements IModal, OnInit {
  public id: number;
  public isModalVisible = false;
  public user: ICurrentUser | null = null;
  public form: FormGroup;
  private config: IWriteGroupReviewConfig;

  public constructor(
    private modalService: ModalService,
    private accountService: AccountService,
    private reviewService: ReviewService,
    private stackReviewForm: StackReviewForm
  ) {
    this.id = ModalIdEnum.WRITE_STACK_REVIEW;
    this.form = stackReviewForm.createCruForm();
  }

  public ngOnInit(): void {
    this.modalService.add(this);
    this.accountService.getStateAsObservable$().subscribe(user => this.user = user);
  }

  public open(config: IWriteGroupReviewConfig): void {
    if (!this.user) {
      console.error('StackReviewModelComponent.open() without user');

      return;
    }
    this.config = config;
    this.isModalVisible = true;
  }

  public close(): void {
    this.isModalVisible = false;
    // @todo: reset form (view)
    this.form.reset();
  }

  public onSubmit(): void {
    if (false === this.isModalVisible) {
      return;
    }

    if (this.form.valid) {
      const values = this.form.getRawValue();
      values.group_id = this.config.groupId;

      this.reviewService.create(values).subscribe(
        response => {
          if (response.success) {
            this.close();
            // @todo: handling page reload
          }
          // @todo: display unknown error
        }
      );

      return;
    }

    this.form.markAllAsTouched();
  }

  // @todo: ngClass error not working properly
  public hasValidationError(fieldName: string): boolean {
    const field = this.stackReviewForm.getField(fieldName);

    return field.invalid && field.touched;
  }
}
