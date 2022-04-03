import {Injectable}            from '@angular/core';
import {LocalStorageService}   from '../../../services/local-storage-services';
import {AbstractApiRepository} from '../../../repositories/abstract-api-repository';
import {HttpService}           from '../../../services/http-service';
import {IUser}                 from '../interfaces/i-user';
import {IResponseEntity}       from '../../../interfaces/i-response-entity';
import {Observable}            from 'rxjs';

@Injectable()
export class AccountRepository extends AbstractApiRepository
{
    private static readonly USER_DATA_KEY = 'user-data-key';

    public constructor(
      httpService: HttpService,
      private localStorageService: LocalStorageService
    )
    {
        super(httpService);
    }

    public getController(): string
    {
        return 'account';
    }

    public storeUserData(user: IUser): void
    {
        this.localStorageService.set(AccountRepository.USER_DATA_KEY, user);
    }

    public getUserData(): IUser | null
    {
        return JSON.parse(this.localStorageService.get(AccountRepository.USER_DATA_KEY)) || null;
    }

    public removeJwt(): void
    {
        this.localStorageService.delete(AccountRepository.USER_DATA_KEY);
    }

    public getByReviewId(reviewId: number): Observable<IResponseEntity<IUser>>
    {
        return this.abstractGet<IUser>(reviewId, 'get-by-review-id');
    }

    public getMyUserData(): Observable<IResponseEntity<IUser>>
    {
        return this.abstractGet<IUser>(null, 'get-my-user-data');
    }
}
