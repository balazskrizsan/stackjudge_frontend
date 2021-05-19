import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../services/account-service';

@Component(
  {
    template: '<h1>Logging out...</h1>',
    styleUrls: [],
    providers: [],
  }
)
export class LogoutActionComponent implements OnInit {
  public constructor(
    private router: Router,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.accountService.logout();
    this.router.navigate(['/']);
  }
}
