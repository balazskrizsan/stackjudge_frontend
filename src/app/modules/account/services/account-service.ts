import {Injectable} from '@angular/core';
import {AccountRepository} from '../repositories/account-repository';

@Injectable()
export class AccountService {

  public constructor(private accountRepository: AccountRepository) {
  }

  public storeJwt(token: string): void {
    this.accountRepository.storeJwt(token);
    console.log(this.accountRepository.getUsername());
    console.log(this.accountRepository.getId());
  }

  public isLoggedIn(): boolean {
    return this.accountRepository.isLoggedIn();
  }
}
