import {ICompany} from './i-company';
import {ICompanyStatistic} from './i-company-statistic';

export interface IGetResponse {
  company: ICompany;
  companyStatistics?: ICompanyStatistic;
}
