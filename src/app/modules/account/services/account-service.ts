import {Injectable}        from '@angular/core';
import {AccountRepository} from '../repositories/account-repository';
import {AccountState}      from '../states/account-state';
import {Observable}        from 'rxjs';
import {IResponseEntity}   from '../../../interfaces/i-response-entity';
import {IUser}             from '../interfaces/i-user';

@Injectable()
export class AccountService
{
    public constructor(
      private accountRepository: AccountRepository,
      private accountState: AccountState
    )
    {
    }

    public getStateAsObservable$(): Observable<IUser | null>
    {
        return this.accountState.getAsObservable$();
    }

    public refresh(): void
    {
        this.updateState(this.accountRepository.getUserData());
    }

    private updateState(user: IUser): void
    {
        this.accountState.setState(user);
    }

    public isLoggedIn(): Promise<boolean>
    {
        return new Promise<boolean>(
          resolve => this.accountState
            .getAsObservable$()
            .subscribe((user: IUser) => user ? resolve(true) : resolve(false))
        );
    }

    public getUsername(): Promise<string>
    {
        return new Promise<string>(
          resolve => this.accountState
            .getAsObservable$()
            .subscribe((user: IUser) => user.username ? resolve(user.username) : resolve(''))
          // @todo: error handling
        );
    }

    public getUserId(): Promise<number>
    {
        return new Promise<number>(
          resolve => this.accountState
            .getAsObservable$()
            .subscribe((user: IUser) => user.id ? resolve(Number(user.id)) : resolve(0))
          // @todo: error handling
        );
    }

    public logout(): void
    {
        this.accountRepository.removeJwt();
        this.accountState.setState(null);
    }

    public getUserByReviewId(reviewId: number): Observable<IResponseEntity<IUser>>
    {
        return this.accountRepository.getByReviewId(reviewId);
    }

    public localLogin(user: IUser): void
    {
        this.accountRepository.storeUserData(user);
        this.updateState(user);
    }

    public loadUserData(): void
    {
        this.accountRepository.getMyUserData().subscribe(res =>
        {
            this.accountRepository.storeUserData(res.data);
            this.updateState(res.data);
        });
    }
}
