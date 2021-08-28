import {Component, OnInit} from '@angular/core';
import {CompanyService}    from '../company/service/company-service';
import {ICompany}          from '../company/interfaces/i-company';
import {environment}       from '../../../environments/environment';
import {UrlService}        from '../company/service/url-service';

@Component({
    selector:    'app-layout-right-block',
    templateUrl: './views/layout-right-block.html',
})
export class LayoutRightBlockComponent implements OnInit
{
    public companies: Array<ICompany> = null;
    public urlService                 = UrlService;

    public constructor(private companyService: CompanyService)
    {
    }

    public ngOnInit(): void
    {
        this
          .companyService
          .search(1, 16, 1, [])
          .subscribe(response =>
          {
              this.companies = response.data.companies;
          });
    }

    public getLogoFullPath(company: ICompany): string
    {
        return environment.cdn.host + company.logoPath;
    }
}
