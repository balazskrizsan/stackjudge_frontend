import {Injectable} from '@angular/core';
import {AccountRepository} from '../repositories/account-repository';

@Injectable()
export class AccountService {

  public constructor(private accountRepository: AccountRepository) {
  }

  public storeJwt(token: string): void {
    this.accountRepository.storeJwt(token);
    console.log();
    console.log(this.accountRepository.getUserId());
  }

  public isLoggedIn(): boolean {
    return this.accountRepository.isLoggedIn();
  }

  public getUsername(): string {
    return this.accountRepository.getUsername();
  }

  public getUserId(): string {
    return this.accountRepository.getUserId();
  }
}
