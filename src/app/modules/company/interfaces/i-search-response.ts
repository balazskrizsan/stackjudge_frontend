import {ICompany} from './i-company';
import {ICompanyStatistic} from './i-company-statistic';
import {IPaginatorItem} from '../../paginator/interfaces/i-paginator-item';

export interface ISearchResponse {
  companies: Array<ICompany>;
  paginator?: Array<IPaginatorItem>;
  newSeekId?: number;
  companyStatistics?: Record<number, ICompanyStatistic>;
}
