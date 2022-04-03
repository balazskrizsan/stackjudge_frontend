import {
    Component,
    OnInit
}                            from '@angular/core';
import {Router}              from '@angular/router';
import {Forms}               from '../forms';
import {AddressForms}        from '../../address/address-forms';
import {ICompany}            from '../interfaces/i-company';
import {ICompanyStatistic}   from '../interfaces/i-company-statistic';
import {IRecursiveGroupTree} from '../interfaces/i-recursive-group-tree';
import {CurrentCompanyState} from '../states/current-company-state.service';
import {ModalService}        from '../../modals/model-service';
import {AccountService}      from '../../account/services/account-service';
import {IReview}             from '../../review/interfaces/i-review';
import {IUser}               from '../../account/interfaces/i-user';
import {IAddress}            from '../../address/interfaces/i-address';

@Component({
    templateUrl: '../views/view-stack.html',
    providers:   [Forms, AddressForms],
})
export class ViewStackActionComponent implements OnInit
{
    public company: ICompany                         = null;
    public companyStatistics: ICompanyStatistic      = null;
    public companyGroups: Array<IRecursiveGroupTree> = null;
    public companyReviews: Array<Array<IReview>>;
    public companyUsers: Array<IUser>;
    public companyAddresses: Array<IAddress>;
    public user: IUser | null;

    public constructor(
      private router: Router,
      private viewDataRegistryService: CurrentCompanyState,
      private modalService: ModalService,
      private accountService: AccountService
    )
    {
        this.viewDataRegistryService.get().subscribe(res =>
        {
            this.company           = res.company;
            this.companyGroups     = res.companyGroups;
            this.companyStatistics = res.companyStatistic;
            this.companyReviews    = res.companyReviews;
            this.companyUsers      = res.companyUsers;
            this.companyAddresses  = res.companyAddresses;
        });
    }

    ngOnInit(): void
    {
        this.accountService.getStateAsObservable$().subscribe(user => this.user = user);
    }
}
