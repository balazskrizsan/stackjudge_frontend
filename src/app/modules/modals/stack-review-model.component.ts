import {Component, OnInit} from '@angular/core';
import {ModalService} from './model-service';
import {IModal} from './interfaces/i-modal';
import {ModalIdEnum} from './enums/modal-id-enum';
import {AccountService} from '../account/services/account-service';
import {ICurrentUser} from '../account/interfaces/i-current-user';
import {FormGroup} from '@angular/forms';
import {StackReviewForm} from './forms/stack-review-form';
import {ReviewService} from '../review/services/review-service';
import {IWriteStackReviewConfig} from './interfaces/i-write-stack-review-config';

@Component({
  selector: 'app-stack-review-modal',
  templateUrl: './views/stack-review.html',
  providers: [StackReviewForm]
})
export class StackReviewModelComponent implements IModal, OnInit {
  public id: number;
  public isModalVisible = false;
  public user: ICurrentUser | null = null;
  private config: IWriteStackReviewConfig;
  public form: FormGroup;

  constructor(
    private modalService: ModalService,
    private accountService: AccountService,
    private reviewService: ReviewService,
    private stackReviewForm: StackReviewForm
  ) {
    this.id = ModalIdEnum.WRITE_STACK_REVIEW;
    this.form = stackReviewForm.createCruForm();
  }

  ngOnInit(): void {
    this.modalService.add(this);
    this.accountService.getStateAsObservable$().subscribe(user => this.user = user);
  }

  open(id: number, config: IWriteStackReviewConfig): void {
    if (!this.user) {
      console.error('StackReviewModelComponent.open() without user');

      return;
    }
    this.config = config;
    this.isModalVisible = true;
  }

  close(): void {
    this.isModalVisible = false;
    // @todo: reset form (view)
    this.form.reset();
  }

  onSubmit(): void {
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
  isValidField(fieldName: string): boolean {
    const field = this.stackReviewForm.getField(fieldName);

    return field.invalid && (field.touched);
  }
}
