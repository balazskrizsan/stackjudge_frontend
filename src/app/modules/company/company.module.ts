import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutingModule} from './routing.module';
import {SharedModule} from '../shared-module';
import {CreateActionComponent} from './controllers/create-action.component';
import {AddressFormComponentModule} from '../address/address-form.component.module';
import {LeftMenuModule} from '../left-menu/left-menu.module';
import {ListActionComponent} from './controllers/list-action.component';
import {ViewActionComponent} from './controllers/view-action.component';
import {PaginatorModule} from '../paginator/paginator.module';

@NgModule(
  {
    imports: [CommonModule, RoutingModule, SharedModule, AddressFormComponentModule, LeftMenuModule, PaginatorModule],
    declarations: [CreateActionComponent, ListActionComponent, ViewActionComponent],
  }
)
export class CompanyModule {
}
