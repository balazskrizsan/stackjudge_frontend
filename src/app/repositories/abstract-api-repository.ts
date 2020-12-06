import {HttpService} from '../services/http-service';
import {HttpParams} from '@angular/common/http';
import {IAbstractCrudApiRepository} from './i-abstract-crud-api-repository';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {IResponseEntity} from '../interfaces/i-response-entity';

export abstract class AbstractApiRepository implements IAbstractCrudApiRepository {
  protected constructor(private httpService: HttpService) {
  }

  private static paramOverRider(value: any): any {
    if ('boolean' === typeof value) {
      return value ? 1 : 0;
    }

    return value;
  }

  static createHttpParams(rawData: {}, params: HttpParams, parent?: string): HttpParams {
    Object.keys(rawData).forEach(
      (key: string) => {
        if ('undefined' === typeof rawData[key] || null === rawData[key]) {
          return ;
        }

        const valueOrChild = AbstractApiRepository.paramOverRider(rawData[key]);

        if ('object' === typeof valueOrChild) {
          params = this.createHttpParams(valueOrChild, params, key);

          return params;
        }

        if (null !== parent) {
          key = key.match(/\d+/) ? parent : parent + '[' + key + ']';
        }

        params = params.append(key, valueOrChild);
      }
    );
    return params;
  }

  abstract getController(): string;

  protected post<T>(uri: string = '', postData: {} = {}): Observable<IResponseEntity<T>> {
    if ('' === uri) {
      uri = this.getController();
    }

    return this.httpService.post<T>(`${environment.backend.api.host}${uri}`, postData);
  }

  create(updateData: {} = {}): Observable<IResponseEntity<null>> {
    return this.post<null>('', updateData);
  }

  delete(siteId: number): Promise<boolean> {
    return Promise.resolve(false);
  }

  search<T>(seekId: number, limit: number, navigationId?: number, uri = '', requestRelationIds?: number[]):
    Observable<IResponseEntity<T>> {
    if ('' === uri) {
      uri = this.getController();
    }

    return this.httpService.get<T>(
      `${environment.backend.api.host}${uri}`,
      AbstractApiRepository.createHttpParams({seekId, limit, navigationId, requestRelationIds}, new HttpParams(), null)
    );
  }

  get<T>(id: number, requestRelationIds?: number[], uri = ''): Observable<IResponseEntity<T>> {
    if ('' === uri) {
      uri = this.getController();
    }

    return this.httpService.get<T>(
      `${environment.backend.api.host}${uri}/${id}`,
      AbstractApiRepository.createHttpParams({requestRelationIds}, new HttpParams(), null)
    );
  }

  update(updateData): Promise<boolean> {
    return Promise.resolve(false);
  }
}

