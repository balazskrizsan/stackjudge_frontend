import {Observable} from 'rxjs';
import {IResponseEntity} from '../interfaces/i-response-entity';

export interface IAbstractCrudApiRepository {
  abstractGet<T>(idParam: number, actionParam: string, requestRelationIds?: number[]): Observable<IResponseEntity<T>>;

  abstractUpdate(updateData: {}): Promise<boolean>;

  abstractSeekSearch<T>(seekId: number, limit: number, navigationId?: number, requestRelationIds?: number[], actionParam?: string):
    Observable<IResponseEntity<T>>;

  abstractOffsetSearch<T>(offset: number, limit: number, actionParam: string, requestRelationIds?: number[]):
    Observable<IResponseEntity<T>>;

  abstractDelete(idParam: number, actionParam: string): Observable<IResponseEntity<boolean>>;

  create(updateData: {}): Observable<IResponseEntity<null>>;
}
