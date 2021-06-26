import {ICompany} from './i-company';
import {ICompanyStatistic} from './i-company-statistic';
import {IRecursiveGroupTree} from './i-recursive-group-tree';
import {IReview} from '../../review/interfaces/i-review';
import {IUser} from '../../account/interfaces/i-user';

export interface IGetResponse {
  company: ICompany;
  companyStatistic?: ICompanyStatistic;
  companyGroups?: Array<IRecursiveGroupTree>;
  companyReviews?: Array<Array<IReview>>;
  companyUsers?: Array<IUser>;
}
