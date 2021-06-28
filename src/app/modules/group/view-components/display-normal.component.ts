import {Component, Input, OnInit} from '@angular/core';
import {IRecursiveGroupTree} from '../../company/interfaces/i-recursive-group-tree';
import {IUser} from '../../account/interfaces/i-user';
import {IReview} from '../../review/interfaces/i-review';
import {IWriteStackReviewConfig} from '../../modals/interfaces/i-write-stack-review-config';
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
  @Input() recursiveGroupTrees: Array<IRecursiveGroupTree>;
  @Input() reviews: Array<Array<IReview>>;
  @Input() reviewUsers: Array<IUser>;
  @Input() level: string;

  private user: ICurrentUser;

  public constructor(
    private router: Router,
    private modalService: ModalService,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.accountService.getStateAsObservable$().subscribe(user => this.user = user);
  }

  public openWriteStackReviewModal(config: IWriteStackReviewConfig): void {
    this.modalService.open(ModalIdEnum.WRITE_STACK_REVIEW, config);
  }

  public isLoggedIn(): boolean {
    return this.user !== null;
  }
}
