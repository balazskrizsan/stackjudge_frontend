import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {Router} from '@angular/router';
import {Forms} from '../forms';
import {AddressForms} from '../../address/address-forms';
import {ICompany} from '../interfaces/i-company';
import {ICompanyStatistic} from '../interfaces/i-company-statistic';
import {IRecursiveGroupTree} from '../interfaces/i-recursive-group-tree';
import {ViewDataRegistryService} from '../service/view-data-registry-service';
import {IAddress} from '../../address/interfaces/i-address';
import {IReview} from '../../review/interfaces/i-review';
import {IUser} from '../../account/interfaces/i-user';
import {environment} from '../../../../environments/environment';

@Component(
  {
    templateUrl: '../views/view-home.html',
    styleUrls: ['../styles/styles.scss'],
    providers: [Forms, AddressForms],
  }
)
export class ViewHomeActionComponent {
  public company: ICompany = null;
  public companyStatistics: ICompanyStatistic = null;
  public companyGroups: Array<IRecursiveGroupTree> = null;
  public companyAddresses: Array<IAddress> = null;
  public companyAddressMaps: Array<Array<string>> = null;
  public companyReviews: Array<Array<IReview>> = null;
  public companyUsers: Array<IUser> = null;
  @ViewChildren('maps')
  public maps!: QueryList<ElementRef<HTMLLIElement>>;

  public constructor(
    private router: Router,
    private viewDataRegistryService: ViewDataRegistryService
  ) {
    this.viewDataRegistryService.get().subscribe(res => {
      this.company = res.company;
      this.companyGroups = res.companyGroups;
      this.companyStatistics = res.companyStatistic;
      this.companyAddresses = res.companyAddresses;
      this.companyAddressMaps = res.companyAddressMaps;
      this.companyReviews = res.companyReviews;
      this.companyUsers = res.companyUsers;
    });
  }

  public getMapUrl(mapId: number): string {
    return environment.cdn.host + this.companyAddressMaps[mapId];
  }
}
