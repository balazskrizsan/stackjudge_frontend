import {ICompany} from './i-company';
import {ICompanyStatistic} from './i-company-statistic';
import {IRecursiveGroupTree} from './i-recursive-group-tree';
import {IReview} from '../../review/interfaces/i-review';

export interface IViewDataRegistry {
  company?: ICompany;
  companyStatistic?: ICompanyStatistic;
  companyGroups?: Array<IRecursiveGroupTree>;
  companyReviews?: Array<Array<IReview>>;
}
