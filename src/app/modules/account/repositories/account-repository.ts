import {Injectable} from '@angular/core';
import {LocalStorageService} from '../../../services/local-storage-services';
import {AbstractApiRepository} from '../../../repositories/abstract-api-repository';
import {HttpService} from '../../../services/http-service';
import {IUser} from '../interfaces/i-user';
import {IResponseEntity} from '../../../interfaces/i-response-entity';
import {Observable} from 'rxjs';

@Injectable()
export class AccountRepository extends AbstractApiRepository {
  private static readonly jwtKey = 'jwt';

  public constructor(
    httpService: HttpService,
    private localStorageService: LocalStorageService
  ) {
    super(httpService);
  }

  public getController(): string {
    return 'account';
  }

  public storeJwt(token: string): void {
    this.localStorageService.set(AccountRepository.jwtKey, token);
  }

  public getJwt(): string {
    return this.localStorageService.get(AccountRepository.jwtKey) || '';
  }

  public removeJwt(): void {
    this.localStorageService.delete(AccountRepository.jwtKey);
  }

  public getByReviewId(reviewId: number): Observable<IResponseEntity<IUser>> {
    return this.abstractGet<IUser>(reviewId, 'get-by-review-id');
  }
}
