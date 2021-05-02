import {Injectable} from '@angular/core';
import {LocalStorageService} from '../../../services/local-storage-services';
import {IJwt} from '../interfaces/i-jwt';

@Injectable()
export class AccountRepository {
  private jwtKey = 'jwt';
  private parsedJwt: null | IJwt = null;

  public constructor(private localStorageService: LocalStorageService) {
  }

  public storeJwt(token: string): void {
    this.parsedJwt = AccountRepository.parseJwt(token);
    this.localStorageService.set(this.jwtKey, token);
  }

  private getJwt(): string {
    return this.localStorageService.get(this.jwtKey);
  }

  private static parseJwt(token: string): IJwt {
    try {
      const base64Url = token.split('.')[1];

      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

      const jsonPayload = JSON.parse(decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')));

      jsonPayload.sub = jsonPayload.sub.split(',');

      return jsonPayload;
    } catch (e) {
      console.error('JWT decompile error:', e.message);
      //@todo: handle error
    }
  };

  public getId(): string {
    return this.getSubSegment(0);
  }

  public getUsername(): string {
    return this.getSubSegment(1);
  }

  private getSubSegment(segmentId: number): string {
    if (this.parsedJwt === null) {
      this.parsedJwt = AccountRepository.parseJwt(this.getJwt())
    }

    return this.parsedJwt.sub[segmentId];
  }
}
