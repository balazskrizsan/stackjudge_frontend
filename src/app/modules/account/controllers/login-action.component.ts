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
export class LoginActionComponent implements OnInit {
  public constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      //@todo: validate params.jwt
      this.accountService.storeJwt(params.jwt);
    });
  }
}
