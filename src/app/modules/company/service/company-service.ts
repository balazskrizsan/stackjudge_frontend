import {Injectable} from '@angular/core';
import {CompanyRepository} from '../repositories/company-repository';
import {Observable} from 'rxjs';
import {IResponseEntity} from '../../../interfaces/i-response-entity';
import {ISearchResponse} from '../interfaces/i-search-response';
import {IGetResponse} from '../interfaces/i-get-response';

@Injectable()
export class CompanyService {
  public constructor(private repository: CompanyRepository) {
  }

  create(updateData: {}): Observable<IResponseEntity<null>> {
    return this.repository.create(updateData);
  }

  get(id: number, requestRelationIds?: number[]): Observable<IResponseEntity<IGetResponse>> {
    return this.repository.get(id, requestRelationIds);
  }

  search(seekId: number, limit: number, navigationId?: number, companyRequestRelations?: number[]):
    Observable<IResponseEntity<ISearchResponse>> {
    return this.repository.search<ISearchResponse>(seekId, limit, navigationId, '', companyRequestRelations);
  }
}
