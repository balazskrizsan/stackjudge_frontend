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

  public create(updateData: {}): Observable<IResponseEntity<null>> {
    return this.repository.abstractPost(updateData);
  }

  public get(id: number, requestRelationIds?: number[]): Observable<IResponseEntity<IGetResponse>> {
    return this.repository.abstractGet(id, '', requestRelationIds);
  }

  public search(seekId: number, limit: number, navigationId?: number, companyRequestRelations?: number[]):
    Observable<IResponseEntity<ISearchResponse>> {
    return this.repository.abstractSeekSearch<ISearchResponse>(seekId, limit, navigationId, companyRequestRelations);
  }
}
