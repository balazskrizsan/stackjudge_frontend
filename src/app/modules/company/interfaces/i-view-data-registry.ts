import {ICompany} from './i-company';
import {ICompanyStatistic} from './i-company-statistic';
import {IRecursiveGroupTree} from './i-recursive-group-tree';
import {IReview} from '../../review/interfaces/i-review';
import {IUser} from '../../account/interfaces/i-user';
import {IAddress} from '../../address/interfaces/i-address';
import {IStaticMapResponse} from '../../maps/interfaces/i-static-map-response';

export interface IViewDataRegistry {
  company?: ICompany;
  companyStatistic?: ICompanyStatistic;
  companyGroups?: Array<IRecursiveGroupTree>;
  companyReviews?: Array<Array<IReview>>;
  companyAddresses?: Array<IAddress>;
  companyAddressMaps?: Array<Array<IStaticMapResponse>>;
  companyUsers?: Array<IUser>;
  companyOwners?: Array<number>;
}
