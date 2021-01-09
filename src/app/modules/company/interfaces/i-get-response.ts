import {ICompany} from './i-company';
import {ICompanyStatistic} from './i-company-statistic';
import {IRecursiveGroupTree} from './i-recursive-group-tree';

export interface IGetResponse {
  company: ICompany;
  companyStatistics?: ICompanyStatistic;
  companyGroups?: Array<IRecursiveGroupTree>;
}
