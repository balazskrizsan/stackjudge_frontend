import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ICurrentUser} from '../interfaces/i-current-user';

@Injectable()
export class AccountState {
  private user: BehaviorSubject<ICurrentUser|null> = new BehaviorSubject(null);

  public getAsObservable$(): Observable<ICurrentUser|null> {
    return this.user.asObservable();
  }

  public setState(user: ICurrentUser|null): void {
    setTimeout(() => {
      this.user.next(user);
    }, 0);
  }
}
