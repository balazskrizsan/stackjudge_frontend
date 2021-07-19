import {Component, Input, OnInit} from '@angular/core';
import {IRecursiveGroupTree} from '../../company/interfaces/i-recursive-group-tree';
import {IUser} from '../../account/interfaces/i-user';
import {IReview} from '../../review/interfaces/i-review';
import {IWriteGroupReviewConfig} from '../../modals/interfaces/i-write-group-review-config';
import {ModalIdEnum} from '../../modals/enums/modal-id-enum';
import {Router} from '@angular/router';
import {ModalService} from '../../modals/model-service';
import {AccountService} from '../../account/services/account-service';
import {ICurrentUser} from '../../account/interfaces/i-current-user';

@Component({
  selector: 'app-group-display-normal',
  templateUrl: './views/display-normal.html',
})
export class DisplayNormalComponent implements OnInit {
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
  ) {
  }

  public ngOnInit(): void {
    this.accountService.getStateAsObservable$().subscribe(user => this.user = user);
  }

  public openWriteStackReviewModal(config: IWriteGroupReviewConfig): void {
    this.modalService.open(ModalIdEnum.WRITE_STACK_REVIEW, config);
  }

  public isLoggedIn(): boolean {
    return this.user !== null;
  }

  public getReviews(): Array<Array<IReview>>
  {
    if (!this.showReviews) {
      return [];
    }

    return this.reviews;
  }

  public getReviewsByGroupId(groupId: number): Array<IReview>
  {
    return this.getReviews()[groupId];
  }
}
