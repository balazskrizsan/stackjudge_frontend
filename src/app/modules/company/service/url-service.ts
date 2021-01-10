import {ICompany} from '../interfaces/i-company';
import {environment} from '../../../../environments/environment';

export class UrlService {
  public static getCompanyHomeViewUri(company: ICompany, full = false): string {
    if (full) {
      return '/company/display/' + company.id;
    }

    return './';
  }

  public static getCompanyHomeViewName(): string
  {
    return '';
  }

  public static getCompanyStackViewUri(company: ICompany, full = false): string {
    if (full) {
      return '/company/display/' + company.id + '/stack';
    }

    return './stack';
  }

  public static getCompanyStackViewName(): string
  {
    return 'stack';
  }

  public static getCompanyLogoUrl(company: ICompany): string {
    return environment.cdn.host + company.logoPath;
  }
}
