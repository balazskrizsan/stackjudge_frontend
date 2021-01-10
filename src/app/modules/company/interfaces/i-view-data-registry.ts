import {ICompany} from './i-company';
import {ICompanyStatistic} from './i-company-statistic';
import {IRecursiveGroupTree} from './i-recursive-group-tree';

export interface IViewDataRegistry {
  company?: ICompany;
  companyStatistic?: ICompanyStatistic;
  companyGroups?: Array<IRecursiveGroupTree>;
}
