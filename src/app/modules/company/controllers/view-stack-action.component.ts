import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Forms} from '../forms';
import {AddressForms} from '../../address/address-forms';
import {ICompany} from '../interfaces/i-company';
import {ICompanyStatistic} from '../interfaces/i-company-statistic';
import {IRecursiveGroupTree} from '../interfaces/i-recursive-group-tree';
import {ViewDataRegistryService} from '../service/view-data-registry-service';
import {ModalService} from '../../modals/model-service';
import {ICurrentUser} from '../../account/interfaces/i-current-user';
import {AccountService} from '../../account/services/account-service';
import {IReview} from '../../review/interfaces/i-review';
import {IUser} from '../../account/interfaces/i-user';
import {IAddress} from '../../address/interfaces/i-address';

@Component({
  templateUrl: '../views/view-stack.html',
  providers: [Forms, AddressForms],
})
export class ViewStackActionComponent implements OnInit, OnDestroy {
  company: ICompany = null;
  companyStatistics: ICompanyStatistic = null;
  companyGroups: Array<IRecursiveGroupTree> = null;
  companyReviews: Array<Array<IReview>>;
  companyUsers: Array<IUser>;
  companyAddresses: Array<IAddress>;
  user: ICurrentUser | null;

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
      this.companyUsers = res.companyUsers;
      this.companyAddresses = res.companyAddresses;
    });
  }

  ngOnInit(): void {
    this.accountService.getStateAsObservable$().subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    // @todo: do we need unsub?
  }
}
