import {Injectable} from '@angular/core';
import {AccountRepository} from '../repositories/account-repository';

@Injectable()
export class AccountService {

  public constructor(private accountRepository: AccountRepository) {
  }

  public storeJwt(token: string): void {
    this.accountRepository.storeJwt(token);
  }

  public getJwt(): string {
    return this.accountRepository.getJwt();
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

  public logout(): void {
    this.accountRepository.removeJwt();
  }
}
