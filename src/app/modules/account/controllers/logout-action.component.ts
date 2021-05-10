import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../services/account-service';

@Component(
  {
    template: '',
    styleUrls: [],
    providers: [],
  }
)
export class LogoutActionComponent implements OnInit {
  public constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.accountService.logout();
  }
}
