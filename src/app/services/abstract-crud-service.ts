import {RestListInterface} from '../interfaces/rest-list-interface';
import {IAbstractCrudService} from './i-abstract-crud-service';
import {IAbstractCrudApiRepository} from '../repositories/i-abstract-crud-api-repository';
import {Observable} from 'rxjs';
import {IResponseEntity} from '../interfaces/i-response-entity';

export abstract class AbstractCrudService<T, R extends IAbstractCrudApiRepository> implements IAbstractCrudService<T> {
  private list: Array<T> = [];
  private loadingStarted = false;
  private loadingDone = false;
  readonly repository: R;
  readonly retryTime: number;

  private defaultGetListConfig: RestListInterface = {
    topLevelResolver: null,
  };

  // protected constructor(repository: R, retryTime: number = 200) {
  protected constructor(repository, retryTime: number = 200) {
    this.repository = repository;
    this.retryTime = retryTime;
  }

  async load(): Promise<void> {
    // this.loadingDone = false;
    // this.loadingStarted = true;
    // const response = await this.repository.search();
    // this.loadingDone = true;
    // if (response) {
    //   this.list = response.list;
    // }
  }

  create(updateData: {}): Observable<IResponseEntity<T>> {
    return this.repository.create(updateData);
  }

  // tslint:disable-next-line:no-shadowed-variable
  search<T>(): Observable<IResponseEntity<T>> {
    return this.repository.search();
  }
}
