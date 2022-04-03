import {
    Component,
    OnInit
}                       from '@angular/core';
import {
    ActivatedRoute,
    Router
}                       from '@angular/router';
import {AccountService} from '../services/account-service';

@Component(
  {
      template:  '',
      styleUrls: [],
      providers: [],
  }
)
export class LoginActionComponent implements OnInit
{
    public constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private accountService: AccountService
    )
    {
    }

    ngOnInit(): void
    {
        this.accountService.loadUserData();

        this.router.navigate(['/']);
    }
}
