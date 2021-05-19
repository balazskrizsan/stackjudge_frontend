import {Component, OnInit} from '@angular/core';
import {AccountService} from './modules/account/services/account-service';
import {environment} from '../environments/environment';
import {IUser} from './modules/account/interfaces/i-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AccountService]
})
export class AppComponent implements OnInit{
  fbLoginAndRegistrationUrl = environment.backend.account.fbLoginAndRegistrationUrl;
  user: IUser|null;

  public constructor(public accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.getStateAsObservable$().subscribe(user =>  this.user = user);
    this.accountService.refresh();
  }
}
