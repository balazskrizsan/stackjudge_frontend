import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutingModule} from './routing.module';
import {SharedModule} from '../shared-module';
import {CreateActionComponent} from './controllers/create-action.component';
import {AddressFormComponentModule} from '../address/address-form.component.module';
import {LeftMenuComponentModule} from '../left-menu/left-menu.component.module';
import {ListActionComponent} from './controllers/list-action.component';

@NgModule(
  {
    imports: [CommonModule, RoutingModule, SharedModule, AddressFormComponentModule, LeftMenuComponentModule],
    declarations: [CreateActionComponent, ListActionComponent],
  }
)
export class CompanyModule {
}
