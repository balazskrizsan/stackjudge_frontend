import {
    Component,
    OnInit
}                            from '@angular/core';
import {AccountService}      from './modules/account/services/account-service';
import {environment}         from '../environments/environment';
import {UrlService}          from './modules/company/service/url-service';
import {IUser}      from './modules/account/interfaces/i-user';
import {
    OidcSecurityService,
    UserDataResult
}                   from 'angular-auth-oidc-client';
import {Observable} from "rxjs";

export interface IIdentityServerUser
{
    name: string,
    picture: string,
    preferred_username: string,
    sub: string,
}

@Component({
    selector:    'app-root',
    templateUrl: './app.component.html',
    styleUrls:   ['./app.component.scss'],
    providers:   [AccountService]
})
export class AppComponent implements OnInit
{
    public user: IUser | null        = null;
    public urlService                = UrlService;
    userData$: Observable<UserDataResult>;

    public constructor(
      public accountService: AccountService,
      public oidcSecurityService: OidcSecurityService
    )
    {
        this.userData$ = this.oidcSecurityService.userData$;
        this.oidcSecurityService.checkAuth().subscribe(({isAuthenticated, userData, accessToken, idToken}) =>
        {
            const identityServerUser: IIdentityServerUser = userData;
            this.accountService.localLogin({
                id: 1,
                profilePictureUrl: identityServerUser.picture,
                username: identityServerUser.name,
            });
        });
    }

    public login(): void
    {
        this.oidcSecurityService.authorize();
    }

    public ngOnInit(): void
    {
        this.accountService.getStateAsObservable$().subscribe(user => this.user = user);
        this.accountService.refresh();
    }
}
