import {ICompany} from '../interfaces/i-company';
import {environment} from '../../../../environments/environment';

export class UrlGeneratorService {
  public static getCompanyView(company: ICompany): string {
    return '/company/display/' + company.id;
  }

  public static getCompanyLogo(company: ICompany): string {
    return environment.cdn.host + company.logoPath;
  }
}
