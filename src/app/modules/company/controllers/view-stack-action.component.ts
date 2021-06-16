import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Forms} from '../forms';
import {AddressForms} from '../../address/address-forms';
import {ICompany} from '../interfaces/i-company';
import {ICompanyStatistic} from '../interfaces/i-company-statistic';
import {IRecursiveGroupTree} from '../interfaces/i-recursive-group-tree';
import {ViewDataRegistryService} from '../service/view-data-registry-service';
import {ModalService} from '../../modals/model-service';
import {ModalIdEnum} from '../../modals/enums/modal-id-enum';
import {IWriteStackReviewConfig} from '../../modals/interfaces/i-write-stack-review-config';

@Component(
  {
    templateUrl: '../views/view-stack.html',
    styles: [
      '#company-group-list ul, #company-group-list ul.children { width: 100%; padding-left: 20px; padding-right: 0; margin-right: 0; margin-left: 0}',
      '#company-group-list ul li { width: 100%; padding-right: 0; margin-right: 0; margin-left: 0}',
      '#company-group-list ul#company-group-list-top-level {padding-left: 0}'
    ],
    providers: [Forms, AddressForms],
  }
)
export class ViewStackActionComponent {
  company: ICompany = null;
  companyStatistics: ICompanyStatistic = null;
  companyGroups: Array<IRecursiveGroupTree> = null;

  public constructor(
    private router: Router,
    private viewDataRegistryService: ViewDataRegistryService,
    private modalService: ModalService
  ) {
    this.viewDataRegistryService.get().subscribe(res => {
      this.company = res.company;
      this.companyGroups = res.companyGroups;
      this.companyStatistics = res.companyStatistic;
    });
  }

  public openWriteStackReviewModal(config: IWriteStackReviewConfig): void {
    this.modalService.open(ModalIdEnum.write_stack_review, config);
  }
}
