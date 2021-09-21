import {
  Component,
  Input,
  OnInit
}                            from '@angular/core';
import {IRecursiveGroupTree} from '../../company/interfaces/i-recursive-group-tree';
import {IUser}               from '../../account/interfaces/i-user';
import {IReview}             from '../../review/interfaces/i-review';
import {Router}              from '@angular/router';
import {ModalService}        from '../../modals/model-service';
import {AccountService}      from '../../account/services/account-service';
import {ICurrentUser}        from '../../account/interfaces/i-current-user';
import {ICompany}            from '../../company/interfaces/i-company';

@Component({
    selector:    'app-group-display-normal',
    templateUrl: './views/display-normal.html',
})
export class DisplayNormalComponent implements OnInit
{
    @Input()
    public company: ICompany;
    @Input()
    public recursiveGroupTrees: Array<IRecursiveGroupTree>;
    @Input()
    public reviews: Array<Array<IReview>>;
    @Input()
    public reviewUsers: Array<IUser>;
    @Input()
    public level: string;
    @Input()
    public showReviews: boolean;

    private user: ICurrentUser;

    public constructor(
      private router: Router,
      private modalService: ModalService,
      private accountService: AccountService
    )
    {
    }

    public ngOnInit(): void
    {
        this.accountService.getStateAsObservable$().subscribe(user => this.user = user);
    }

    public openWriteGroupReviewModal(groupId: number): void
    {
        this.modalService.openWriteGroupReviewModal(groupId);
    }

    public openAddGroupModal(groupId: number, companyId: number): void
    {
        this.modalService.openAddGroupModel(groupId, companyId);
    }

    public openAddGroupTechnologyModel(groupId: number, companyId: number): void
    {
        this.modalService.openAddGroupTechnologyModel(groupId, companyId);
    }

    public isLoggedIn(): boolean
    {
        return this.user !== null;
    }

    public isPopupsAvailable(): boolean
    {
        return this.isLoggedIn() && this.showReviews;
    }

    public getReviews(): Array<Array<IReview>>
    {
        if (!this.showReviews)
        {
            return [];
        }

        return this.reviews;
    }

    public getReviewsByGroupId(groupId: number): Array<IReview>
    {
        return this.getReviews()[groupId];
    }
}
