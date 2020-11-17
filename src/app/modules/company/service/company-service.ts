import {Injectable} from '@angular/core';
import {CompanyRepository} from '../repositories/company-repository';
import {Observable} from 'rxjs';
import {IResponseEntity} from '../../../interfaces/i-response-entity';
import {IListResponse} from '../interfaces/i-list-response';
import {IGetResponse} from '../interfaces/i-get-response';
import {ServiceRelations} from '../enums/service-relations';

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

  search(): Observable<IResponseEntity<IListResponse>> {
    return this.repository.search<IListResponse>('', [ServiceRelations.statistic]);
  }
}
