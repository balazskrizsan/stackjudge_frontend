import {HttpService} from '../services/http-service';
import {IAbstractCrudApiRepository} from './i-abstract-crud-api-repository';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {IResponseEntity} from '../interfaces/i-response-entity';
import {HttpHelperService} from '../services/http-helper-service';

export abstract class AbstractApiRepository implements IAbstractCrudApiRepository {
  httpService: HttpService;

  abstract getController(): string;

  protected constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  /**
   * @deprecated
   */
  protected post<T>(uri: string = '', postData: {} = {}): Observable<IResponseEntity<T>> {
    if ('' === uri) {
      uri = this.getController();
    }

    return this.httpService.post<T>(`${environment.backend.api.host}${uri}`, HttpHelperService.createFormData(postData));
  }

  /**
   * @deprecated
   */
  create(updateData: {} = {}): Observable<IResponseEntity<null>> {
    return this.post<null>('', updateData);
  }

  abstractDelete(idParam: number, actionParam = ''): Observable<IResponseEntity<boolean>> {
    const controller = this.getController();
    const action = actionParam === '' ? '' : '/' + actionParam;

    return this.httpService.delete(`${environment.backend.api.host}${controller}${action}/${idParam}`);
  }

  abstractGet<T>(idParam: number, actionParam = '', requestRelationIds?: number[]): Observable<IResponseEntity<T>> {
    const controller = this.getController();
    const action = actionParam === '' ? '' : '/' + actionParam;

    return this.httpService.get<T>(
      `${environment.backend.api.host}${controller}${action}/${idParam}`,
      HttpHelperService.createHttpParams({requestRelationIds})
    );
  }

  abstractSeekSearch<T>(seekId: number, limit: number, navigationId?: number, requestRelationIds?: number[], actionParam = ''):
    Observable<IResponseEntity<T>> {
    const controller = this.getController();
    const action = actionParam === '' ? '' : '/' + actionParam;

    return this.httpService.get<T>(
      `${environment.backend.api.host}${controller}${action}`,
      HttpHelperService.createHttpParams({seekId, limit, navigationId, requestRelationIds})
    );
  }

  abstractOffsetSearch<T>(offset: number, limit: number, actionParam = '', requestRelationIds?: number[]):
    Observable<IResponseEntity<T>> {
    const controller = this.getController();
    const action = actionParam === '' ? '' : '/' + actionParam;

    return this.httpService.get<T>(
      `${environment.backend.api.host}${controller}${action}`,
      HttpHelperService.createHttpParams({offset, limit, requestRelationIds})
    );
  }

  abstractUpdate(updateData): Promise<boolean> {
    return Promise.resolve(false);
  }
}

