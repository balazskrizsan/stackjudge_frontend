import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Forms} from '../forms';
import {AddressForms} from '../../address/address-forms';
import {ICompany} from '../interfaces/i-company';
import {CompanyService} from '../service/company-service';
import {CompanyRequestRelationsEnum} from '../enums/company-request-relations-enum';
import {ICompanyStatistic} from '../interfaces/i-company-statistic';
import {IPaginatorItem} from '../../paginator/interfaces/i-paginator-item';
import {Location} from '@angular/common';
import {UrlGeneratorService} from '../service/url-generator-service';

@Component(
  {
    templateUrl: './../views/list.html',
    styleUrls: [],
    providers: [Forms, AddressForms],
  }
)
export class ListActionComponent implements OnInit {
  urlGeneratorService = UrlGeneratorService;
  companies: ICompany[] = [];
  companyStatistics: Record<number, ICompanyStatistic>;
  paginator: Array<IPaginatorItem>;
  currentSeekId = 0;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private location: Location,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
        // window.scrollTo(0, 0);
      }
    });
  }

  async onSubmit(): Promise<void> {
  }

  async ngOnInit(): Promise<void> {
    this.currentSeekId = parseInt(this.route.snapshot.paramMap.get('seekId'), 10) || 1;

    this.search(this.currentSeekId);
  }

  onChangePage(navigationId: number): void {
    this.search(this.currentSeekId, navigationId);
  }

  private async search(seekId: number, navigationId: number = null): Promise<void> {
    await this
      .companyService
      .search(seekId, 3, navigationId, [CompanyRequestRelationsEnum.STATISTIC, CompanyRequestRelationsEnum.PAGINATOR])
      .subscribe(
        response => {
          this.companies = response.data.companies;
          this.companyStatistics = response.data.companyStatistics;
          this.paginator = response.data.paginator;
          if (null !== navigationId) {
            this.currentSeekId = response.data.newSeekId;
            this.location.go('/company/' + response.data.newSeekId);
          }
        }
      );
  }
}
