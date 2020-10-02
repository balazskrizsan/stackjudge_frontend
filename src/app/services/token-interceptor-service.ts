import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Inject, Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
// import {AuthService}                                          from '../modules/auth/services/auth-service';
import {LocalStorageService} from './local-storage-services';
import {Observable} from "rxjs";

@Injectable()
@Inject(Router)
@Inject(LocalStorageService)
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (this.localStorageService.get<string>('auth-token')) {
      req = req.clone(
        {
          setHeaders: {
            'Authorization': this.localStorageService.get('auth-token')
          }
        });
    }

    return next
      .handle(req)
      .catch(
        (error, caught) => {
          if (401 === error.status || 403 === error.status) {
            this.handle401and403Error();

            return Observable.of(error.message);
          }

          return Observable.throw(error);
        }
      ) as any;
  }

  private handle401and403Error(): void {
    this.router.navigate(['/auth']);
  }
}
