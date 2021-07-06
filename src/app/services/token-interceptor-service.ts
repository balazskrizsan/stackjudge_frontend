import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from './local-storage-services';
import {Observable} from 'rxjs';
import {AccountService} from '../modules/account/services/account-service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private accountService: AccountService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.accountService.getJwt();

    if (jwt !== '') {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${jwt}`)
      });
    }

    return next.handle(request);
  }
}
