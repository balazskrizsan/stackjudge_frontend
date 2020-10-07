import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Forms} from '../forms';
import {AddressForms} from '../../address/address-forms';
import {ICompany} from '../interfaces/i-company';
import {CompanyService} from '../service/company-service';

@Component(
  {
    templateUrl: './../views/list.html',
    styleUrls: [],
    providers: [Forms, AddressForms],
  }
)
export class ListActionComponent implements OnInit {
  companies: ICompany[] = [
    {
      id: 0,
      name: '',
      companySizeId: 1,
      itSizeId: 1,
    }
  ];

  public constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
  ) {
  }

  async onSubmit(): Promise<void> {
  }

  async ngOnInit(): Promise<void> {
    await this.companyService.search().subscribe(
      response => {
        this.companies = response.data.companies;
      }
    );
  }
}
