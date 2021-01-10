import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Forms} from '../forms';
import {AddressForms} from '../../address/address-forms';
import {ICompany} from '../interfaces/i-company';
import {ICompanyStatistic} from '../interfaces/i-company-statistic';
import {UrlService} from '../service/url-service';
import {IRecursiveGroupTree} from '../interfaces/i-recursive-group-tree';
import {ViewDataRegistryService} from '../service/view-data-registry-service';

@Component(
  {
    templateUrl: '../views/view-home.html',
    styles: [
      '#company-group-list ul, #company-group-list ul.children { width: 100%; padding-left: 20px; padding-right: 0; margin-right: 0; margin-left: 0}',
      '#company-group-list ul li { width: 100%; padding-right: 0; margin-right: 0; margin-left: 0}',
      '#company-group-list ul#company-group-list-top-level {padding-left: 0}'
    ],
    providers: [Forms, AddressForms],
  }
)
export class ViewHomeActionComponent implements OnInit{
  urlGeneratorService = UrlService;
  company: ICompany = null;
  companyStatistics: ICompanyStatistic = null;
  companyGroups: Array<IRecursiveGroupTree> = null;

  public constructor(
    private router: Router,
    private viewDataRegistryService: ViewDataRegistryService
  ) {
  }

  ngOnInit(): void {
    this.viewDataRegistryService.get().subscribe(res => {
      this.company = res.company;
      this.companyGroups = res.companyGroups;
      this.companyStatistics = res.companyStatistic;
    });
  }
}
