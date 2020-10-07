import {ICompany} from './i-company';

export interface IGetResponse {
  company: ICompany;
  requestRelationIds: Array<number>;
}
