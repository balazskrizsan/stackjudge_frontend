import {Component, OnInit} from '@angular/core';
import {AccountService}    from './modules/account/services/account-service';
import {environment}       from '../environments/environment';
import {ICurrentUser}      from './modules/account/interfaces/i-current-user';
import {UrlService}        from './modules/company/service/url-service';

@Component({
    selector:    'app-root',
    templateUrl: './app.component.html',
    styleUrls:   ['./app.component.scss'],
    providers:   [AccountService]
})
export class AppComponent implements OnInit
{
    public fbLoginAndRegistrationUrl = environment.backend.account.fbLoginAndRegistrationUrl;
    public user: ICurrentUser | null = null;
    public urlService                = UrlService;

    public constructor(public accountService: AccountService)
    {
    }

    public ngOnInit(): void
    {
        this.accountService.getStateAsObservable$().subscribe(user => this.user = user);
        this.accountService.refresh();
    }
}
