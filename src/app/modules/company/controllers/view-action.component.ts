import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Forms} from '../forms';
import {AddressForms} from '../../address/address-forms';
import {ICompany} from '../interfaces/i-company';
import {CompanyService} from '../service/company-service';
import {EnumService} from '../../../services/enum-service';
import {ItSizeEnum} from '../enums/it-size-enum';
import {CompanySizeEnum} from '../enums/company-size-enum';
import {ServiceRelations} from '../enums/service-relations';

@Component(
  {
    templateUrl: '../views/view.html',
    styleUrls: [],
    providers: [Forms, AddressForms],
  }
)
export class ViewActionComponent implements OnInit {
  company: ICompany = null;
  serverSideError = false;
  itSizes = EnumService.enumAsArrayKV(ItSizeEnum);
  companySizes = EnumService.enumAsArrayKV(CompanySizeEnum);
  objectKeys = Object.keys;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    protected forms: Forms,
    protected addressForms: AddressForms
  ) {
  }

  async ngOnInit(): Promise<void> {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    await this.companyService.get(id, [ServiceRelations.statistic, ServiceRelations.stack]).subscribe(
      response => {
        if (response.success) {
        }
        this.serverSideError = true;
      }
    );
  }
}
