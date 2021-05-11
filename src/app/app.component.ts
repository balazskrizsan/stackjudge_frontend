import { Component } from '@angular/core';
import {AccountService} from './modules/account/services/account-service';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AccountService]
})
export class AppComponent {
  fbLoginAndReg = environment.backend.account.fbLoginAndReg;

  public constructor(public accountService: AccountService) {
  }

  getAccountService(): AccountService {
    return this.accountService;
  }
}
