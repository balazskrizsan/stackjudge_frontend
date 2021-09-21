import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit
}                                              from '@angular/core';
import {ModalService}                          from './model-service';
import {ModalIdEnum}                           from './enums/modal-id-enum';
import {IReview}                               from '../review/interfaces/i-review';
import {AccountService}                        from '../account/services/account-service';
import {IProtectedReviewDisplayModelComponent} from './interfaces/i-protected-review-display-model-component';
import {IUser}                                 from '../account/interfaces/i-user';
import {AbstractModalComponent}                from './abstract-modal.component';

@Component({
    selector:        'app-protected-review-display-modal',
    templateUrl:     './views/protected-review-display-modal.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProtectedReviewDisplayModelComponent
  extends AbstractModalComponent
  implements OnInit, IProtectedReviewDisplayModelComponent
{
    isModalVisible = false;
    user: IUser    = null;

    review: IReview;

    constructor(
      cdr: ChangeDetectorRef,
      private modalService: ModalService,
      private accountService: AccountService
    )
    {
        super(cdr);
    }

    public ngOnInit(): void
    {
        this.modalService.register(ModalIdEnum.PROTECTED_REVIEW_DISPLAY, this);
    }

    public open(review: IReview): void
    {
        this.cdrTick();
        this.isModalVisible = true;
        this.review         = {...review}; // @todo: need this?
    }

    public close(): void
    {
        this.isModalVisible = false;
        this.reset();
        this.cdrTick();
    }

    public reset(): void
    {
        this.user = null;
    }

    public loadUserForReview(): void
    {
        this.review.visibility = 1;
        this.accountService.getUserByReviewId(this.review.id).subscribe(res =>
        {
            this.user = res.data;
            this.cdrTick();
        });
    }
}
