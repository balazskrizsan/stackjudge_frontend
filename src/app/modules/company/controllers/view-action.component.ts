import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Forms} from '../forms';
import {AddressForms} from '../../address/address-forms';
import {ICompany} from '../interfaces/i-company';
import {CompanyService} from '../service/company-service';
import {CompanyRequestRelationsEnum} from '../enums/company-request-relations-enum';
import {ICompanyStatistic} from '../interfaces/i-company-statistic';
import {UrlGeneratorService} from '../service/url-generator-service';
import {IRecursiveGroupTree} from '../interfaces/i-recursive-group-tree';

@Component(
  {
    templateUrl: '../views/view.html',
    styles: [
      '#company-group-list ul, #company-group-list ul.children { width: 100%; padding-left: 20px; padding-right: 0; margin-right: 0; margin-left: 0}',
      '#company-group-list ul li { width: 100%; padding-right: 0; margin-right: 0; margin-left: 0}',
      '#company-group-list ul#company-group-list-top-level {padding-left: 0}'
    ],
    providers: [Forms, AddressForms],
  }
)
export class ViewActionComponent implements OnInit {
  urlGeneratorService = UrlGeneratorService;
  company: ICompany = null;
  companyStatistics: ICompanyStatistic = null;
  companyGroups: Array<IRecursiveGroupTree> = null;

  public constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    await this.companyService.get(id, [CompanyRequestRelationsEnum.STATISTIC, CompanyRequestRelationsEnum.GROUP]).subscribe(
      response => {
        this.company = response.data.company;
        this.companyStatistics = response.data.companyStatistics;
        this.companyGroups = response.data.companyGroups;
      }
    );
  }
}
