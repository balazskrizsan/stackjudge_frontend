import {
    Component,
    Input,
    OnInit
}                       from '@angular/core';
import {IReview}        from '../interfaces/i-review';
import {IUser}          from '../../account/interfaces/i-user';
import {VisibilityEnum} from '../enums/visibility-enum';
import {AccountService} from '../../account/services/account-service';
import {environment}    from '../../../../environments/environment';
import {ModalService}   from '../../modals/model-service';

@Component({
    selector:    'app-review-display-small',
    templateUrl: './views/display-small.html',
    styleUrls:   ['./styles/display-small.scss'],
})
export class DisplaySmallComponent implements OnInit
{
    @Input() review: IReview;
    @Input() user: IUser;

    loginUrl = environment.backend.account.fbLoginAndRegistrationUrl;

    private currentUser: IUser = null;

    constructor(
      private accountService: AccountService,
      private modalService: ModalService
    )
    {
    }

    ngOnInit(): void
    {
        this.accountService.getStateAsObservable$().subscribe(user => this.currentUser = user);
    }

    isCurrentUserLoggedIn(): boolean
    {
        return null !== this.currentUser;
    }

    isReviewerVisible(): boolean
    {
        if (this.review.visibility === VisibilityEnum.EVERYBODY)
        {
            return true;
        }

        if (this.review.visibility === VisibilityEnum.REGISTERED && this.isCurrentUserLoggedIn())
        {
            return true;
        }

        return false;
    }

    hasReviewTrackedReviewer(): boolean
    {
        return this.review.visibility === VisibilityEnum.PROTECTED;
    }

    showReviewer(): void
    {
        this.modalService.openProtectedReview(this.review);
    }
}
