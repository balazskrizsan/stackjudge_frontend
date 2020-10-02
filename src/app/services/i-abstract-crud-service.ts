import {Observable} from 'rxjs';
import {IResponseEntity} from '../interfaces/i-response-entity';

export interface IAbstractCrudService<T> {
  // load(): Promise<void>;

  // get(condition: object, topLevelResolver): Promise<T>;

  // tslint:disable-next-line:no-shadowed-variable
  search<T>(uri?: string): Observable<IResponseEntity<T>>;

  // update(updateData: T): Promise<boolean>;

  create(updateData: {}): Observable<any>;

  // delete(siteId: number): Promise<boolean>;
}
