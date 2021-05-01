import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutingModule} from './routing.module';
import {SharedModule} from '../shared-module';
import {LoginActionComponent} from './controllers/login-action.component';

@NgModule(
  {
    imports: [CommonModule, RoutingModule, SharedModule],
    declarations: [LoginActionComponent],
  }
)
export class AccountModule {
}
