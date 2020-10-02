import {Observable} from 'rxjs';
import {IResponseEntity} from '../interfaces/i-response-entity';

export interface IAbstractCrudApiRepository {
  search<T>(uri?: string): Observable<IResponseEntity<T>>;

  update(updateData): Promise<boolean>;

  create(updateData: {}): Observable<IResponseEntity<null>>;

  delete(siteId: number): Promise<boolean>;
}
