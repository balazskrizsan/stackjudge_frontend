import { Component } from '@angular/core';
import {AccountService} from './modules/account/services/account-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AccountService]
})
export class AppComponent {
  public constructor(public accountService: AccountService) {
  }

  getAccountService(): AccountService {
    return this.accountService;
  }
}
