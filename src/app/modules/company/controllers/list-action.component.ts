import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Forms} from '../forms';
import {AddressForms} from '../../address/address-forms';
import {ICompany} from '../interfaces/i-company';
import {CompanyService} from '../service/company-service';
import {CompanyRequestRelationsEnum} from '../enums/company-request-relations-enum';
import {ICompanyStatistic} from '../interfaces/i-company-statistic';

@Component(
  {
    templateUrl: './../views/list.html',
    styleUrls: [],
    providers: [Forms, AddressForms],
  }
)
export class ListActionComponent implements OnInit {
  companies: ICompany[] = [];
  companyStatistics: Record<number, ICompanyStatistic>;

  public constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
  ) {
  }

  async onSubmit(): Promise<void> {
  }

  async ngOnInit(): Promise<void> {
    await this.companyService.search(1, 2, [CompanyRequestRelationsEnum.STATISTIC]).subscribe(
      response => {
        this.companies = response.data.companies;
        this.companyStatistics = response.data.companyStatistics;
      }
    );
  }
}
