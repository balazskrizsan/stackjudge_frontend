import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/catch';
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

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const jwt = this.accountService.getJwt();

    if (jwt !== '') {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + jwt
        }
      });
    }

    return next.handle(req);
    // todo: add error handling
    // return next
    //   .handle(req)
    //   .catch(
    //     (error, caught) => {
    //       if (401 === error.status || 403 === error.status) {
    //         this.handle401and403Error();
    //
    //         return Observable.of(error.message);
    //       }
    //
    //       return Observable.throw(error);
    //     }
    //   ) as any;
  }

  private handle401and403Error(): void {
    this.router.navigate(['/auth']);
  }
}
