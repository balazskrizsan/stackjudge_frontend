import {
    Component,
    OnInit
}                                    from '@angular/core';
import {ActivatedRoute}              from '@angular/router';
import {Forms}                       from '../forms';
import {AddressForms}                from '../../address/address-forms';
import {ICompany}                    from '../interfaces/i-company';
import {CompanyService}              from '../service/company-service';
import {CompanyRequestRelationsEnum} from '../enums/company-request-relations-enum';
import {ICompanyStatistic}           from '../interfaces/i-company-statistic';
import {UrlService}                  from '../service/url-service';
import {IRecursiveGroupTree}         from '../interfaces/i-recursive-group-tree';
import {CurrentCompanyState}         from '../states/current-company-state.service';
import {IReview}                     from '../../review/interfaces/i-review';
import {IUser}                       from '../../account/interfaces/i-user';
import {IAddress}                    from '../../address/interfaces/i-address';
import {IStaticMapResponse}          from '../../maps/interfaces/i-static-map-response';
import {environment}                 from '../../../../environments/environment';
import {MapPositionEnum}             from '../../maps/enums/map-position-enum';
import {ModalService}                from '../../modals/model-service';

@Component({
    templateUrl: '../views/view-index.html',
    styleUrls:   ['../styles/view-index.scss'],
    providers:   [Forms, AddressForms],
})
export class ViewIndexActionComponent implements OnInit
{
    urlGeneratorService                                  = UrlService;
    company: ICompany                                    = null;
    companyStatistics: ICompanyStatistic                 = null;
    companyGroups: Array<IRecursiveGroupTree>            = null;
    companyReviews: Array<Array<IReview>>                = null;
    companyUsers: Array<IUser>                           = null;
    companyAddresses: Array<IAddress>                    = null;
    companyAddressMaps: Array<Array<IStaticMapResponse>> = null;
    companyOwners: Array<number>                         = null;
    subPageComponent: any                                = null;
    mapUrl: string                                       = null;

    public constructor(
      private route: ActivatedRoute,
      private companyService: CompanyService,
      private viewDataRegistryService: CurrentCompanyState,
      private modalService: ModalService,
    )
    {
    }

    public async ngOnInit(): Promise<void>
    {
        const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

        await this.companyService.get(id, [
            CompanyRequestRelationsEnum.STATISTIC,
            CompanyRequestRelationsEnum.GROUP,
            CompanyRequestRelationsEnum.REVIEW,
            CompanyRequestRelationsEnum.ADDRESS,
            CompanyRequestRelationsEnum.OWNERS
        ]).subscribe(
          response =>
          {
              this.company            = response.data.company;
              this.companyStatistics  = response.data.companyStatistic;
              this.companyGroups      = response.data.companyGroups;
              this.companyReviews     = response.data.companyReviews;
              this.companyUsers       = response.data.companyUsers;
              this.companyAddresses   = response.data.companyAddresses;
              this.companyOwners      = response.data.companyOwners;
              this.companyAddressMaps = response.data.companyAddressMaps;

              this.viewDataRegistryService.next({
                  company:            this.company,
                  companyGroups:      this.companyGroups,
                  companyStatistic:   this.companyStatistics,
                  companyReviews:     this.companyReviews,
                  companyUsers:       this.companyUsers,
                  companyAddresses:   this.companyAddresses,
                  companyAddressMaps: this.companyAddressMaps
              });
          }
        );
    }

    public routeActivated(componentRef: any): void
    {
        this.subPageComponent = componentRef;
    }

    public isActiveUri(currentUri: string): boolean
    {
        if (null === this.subPageComponent)
        {
            return false;
        }

        return this.subPageComponent.router.routerState.snapshot.url.split('/')[4] || '' === currentUri;
    }

    public getHeaderMapUrl(): string
    {
        if (this.companyAddressMaps[this.company.id] && this.companyAddressMaps[this.company.id])
        {
            return environment.cdn.host
              + this.companyAddressMaps[this.company.id][MapPositionEnum.COMPANY_HEADER].location;
        }

        return '';
    }

    public openOwnModal($event: MouseEvent, company: ICompany): void
    {
        $event.preventDefault();
        this.modalService.openOwnCompany(company);
    }

    public hasOwner(): boolean
    {
        return null !== this.companyOwners;
    }

    public getOwners(): Array<IUser>
    {
        return this.companyOwners.map(o => this.companyUsers[o]);
    }
}
