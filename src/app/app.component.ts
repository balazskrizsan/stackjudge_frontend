import {Component, OnInit} from '@angular/core';
import {AccountService} from './modules/account/services/account-service';
import {environment} from '../environments/environment';
import {ICurrentUser} from './modules/account/interfaces/i-current-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AccountService]
})
export class AppComponent implements OnInit{
  fbLoginAndRegistrationUrl = environment.backend.account.fbLoginAndRegistrationUrl;
  user: ICurrentUser|null;

  public constructor(public accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.getStateAsObservable$().subscribe(user =>  this.user = user);
    this.accountService.refresh();
  }
}
