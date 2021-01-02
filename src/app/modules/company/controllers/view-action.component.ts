import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Forms} from '../forms';
import {AddressForms} from '../../address/address-forms';
import {ICompany} from '../interfaces/i-company';
import {CompanyService} from '../service/company-service';
import {CompanyRequestRelationsEnum} from '../enums/company-request-relations-enum';
import {ICompanyStatistic} from '../interfaces/i-company-statistic';
import {UrlGeneratorService} from '../service/url-generator-service';

@Component(
  {
    templateUrl: '../views/view.html',
    styleUrls: [],
    providers: [Forms, AddressForms],
  }
)
export class ViewActionComponent implements OnInit {
  urlGeneratorService = UrlGeneratorService;
  company: ICompany = null;
  companyStatistics: ICompanyStatistic = null;

  public constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    await this.companyService.get(id, [CompanyRequestRelationsEnum.STATISTIC, CompanyRequestRelationsEnum.STACK]).subscribe(
      response => {
        this.company = response.data.company;
        this.companyStatistics = response.data.companyStatistics;
      }
    );
  }
}
