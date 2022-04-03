import {Injectable} from '@angular/core';
import {
    BehaviorSubject,
    Observable
}                   from 'rxjs';
import {IUser}      from '../interfaces/i-user';

@Injectable()
export class AccountState
{
    private user: BehaviorSubject<IUser | null> = new BehaviorSubject(null);

    public getAsObservable$(): Observable<IUser | null>
    {
        return this.user.asObservable();
    }

    public setState(user: IUser | null): void
    {
        setTimeout(() =>
        {
            this.user.next(user);
        }, 0);
    }
}
