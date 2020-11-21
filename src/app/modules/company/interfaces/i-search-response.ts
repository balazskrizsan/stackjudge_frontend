import {ICompany} from './i-company';
import {ICompanyStatistic} from './i-company-statistic';

export interface ISearchResponse {
  companies: Array<ICompany>;
  companyStatistics: Record<number, ICompanyStatistic>;
}
