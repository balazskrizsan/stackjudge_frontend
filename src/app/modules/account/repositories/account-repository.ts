import {Injectable} from '@angular/core';
import {LocalStorageService} from '../../../services/local-storage-services';

@Injectable()
export class AccountRepository {
  private static readonly jwtKey = 'jwt';

  public constructor(private localStorageService: LocalStorageService) {
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
}
