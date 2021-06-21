import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Forms} from '../forms';
import {AddressForms} from '../../address/address-forms';
import {ICompany} from '../interfaces/i-company';
import {ICompanyStatistic} from '../interfaces/i-company-statistic';
import {IRecursiveGroupTree} from '../interfaces/i-recursive-group-tree';
import {ViewDataRegistryService} from '../service/view-data-registry-service';
import {ModalService} from '../../modals/model-service';
import {ModalIdEnum} from '../../modals/enums/modal-id-enum';
import {IWriteStackReviewConfig} from '../../modals/interfaces/i-write-stack-review-config';
import {IUser} from '../../account/interfaces/i-user';
import {AccountService} from '../../account/services/account-service';
import {IReview} from '../../review/interfaces/i-review';

@Component(
  {
    templateUrl: '../views/view-stack.html',
    styles: [
      '#company-group-list ul, #company-group-list ul.children { width: 100%; padding-left: 20px; padding-right: 0; margin-right: 0; margin-left: 0}',
      '#company-group-list ul li { width: 100%; padding-right: 0; margin-right: 0; margin-left: 0}',
      '#company-group-list ul#company-group-list-top-level {padding-left: 0}',
      'article.post { padding: 5px 0 5px 30px; border: 0; }',
      'article.post p { margin: 5px 0; }',
      'article.post .post__author { margin: 0; }',
    ],
    providers: [Forms, AddressForms],
  }
)
export class ViewStackActionComponent implements OnInit, OnDestroy {
  company: ICompany = null;
  companyStatistics: ICompanyStatistic = null;
  companyGroups: Array<IRecursiveGroupTree> = null;
  companyReviews: Array<Array<IReview>>;
  user: IUser | null;

  public constructor(
    private router: Router,
    private viewDataRegistryService: ViewDataRegistryService,
    private modalService: ModalService,
    private accountService: AccountService
  ) {
    this.viewDataRegistryService.get().subscribe(res => {
      this.company = res.company;
      this.companyGroups = res.companyGroups;
      this.companyStatistics = res.companyStatistic;
      this.companyReviews = res.companyReviews;
    });
  }

  ngOnInit(): void {
    this.accountService.getStateAsObservable$().subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    // @todo: do we need unsub?
  }

  public openWriteStackReviewModal(config: IWriteStackReviewConfig): void {
    this.modalService.open(ModalIdEnum.WRITE_STACK_REVIEW, config);
  }

  public isLoggedIn(): boolean {
    return this.user !== null;
  }
}
