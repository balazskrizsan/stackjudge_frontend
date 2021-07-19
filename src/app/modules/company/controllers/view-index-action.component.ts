import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Forms} from '../forms';
import {AddressForms} from '../../address/address-forms';
import {ICompany} from '../interfaces/i-company';
import {CompanyService} from '../service/company-service';
import {CompanyRequestRelationsEnum} from '../enums/company-request-relations-enum';
import {ICompanyStatistic} from '../interfaces/i-company-statistic';
import {UrlService} from '../service/url-service';
import {IRecursiveGroupTree} from '../interfaces/i-recursive-group-tree';
import {ViewDataRegistryService} from '../service/view-data-registry-service';
import {IReview} from '../../review/interfaces/i-review';
import {IUser} from '../../account/interfaces/i-user';
import {IAddress} from '../../address/interfaces/i-address';

@Component({
  templateUrl: '../views/view-index.html',
  providers: [Forms, AddressForms],
})
export class ViewIndexActionComponent implements OnInit {
  urlGeneratorService = UrlService;
  company: ICompany = null;
  companyStatistics: ICompanyStatistic = null;
  companyGroups: Array<IRecursiveGroupTree> = null;
  companyReviews: Array<Array<IReview>> = null;
  companyUsers: Array<IUser> = null;
  companyAddresses: Array<IAddress> = null;
  subPageComponent: any = null;

  public constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private viewDataRegistryService: ViewDataRegistryService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    await this.companyService.get(id, [
      CompanyRequestRelationsEnum.STATISTIC,
      CompanyRequestRelationsEnum.GROUP,
      CompanyRequestRelationsEnum.REVIEW,
      CompanyRequestRelationsEnum.ADDRESS
    ]).subscribe(
      response => {
        this.company = response.data.company;
        this.companyStatistics = response.data.companyStatistic;
        this.companyGroups = response.data.companyGroups;
        this.companyReviews = response.data.companyReviews;
        this.companyUsers = response.data.companyUsers;
        this.companyAddresses = response.data.companyAddresses;

        this.viewDataRegistryService.next({
          company: this.company,
          companyGroups: this.companyGroups,
          companyStatistic: this.companyStatistics,
          companyReviews: this.companyReviews,
          companyUsers: this.companyUsers,
          companyAddresses: this.companyAddresses
        });
      }
    );
  }

  routeActivated(componentRef: any): void {
    this.subPageComponent = componentRef;
  }

  isActiveUri(currentUri: string): boolean {
    if (null === this.subPageComponent) {
      return false;
    }

    return this.subPageComponent.router.routerState.snapshot.url.split('/')[4] || '' === currentUri;
  }
}
