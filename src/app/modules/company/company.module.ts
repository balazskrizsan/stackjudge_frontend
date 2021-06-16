import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutingModule} from './routing.module';
import {SharedModule} from '../shared-module';
import {CreateActionComponent} from './controllers/create-action.component';
import {AddressFormComponentModule} from '../address/address-form.component.module';
import {LeftMenuModule} from '../left-menu/left-menu.module';
import {ListActionComponent} from './controllers/list-action.component';
import {ViewHomeActionComponent} from './controllers/view-home-action.component';
import {PaginatorModule} from '../paginator/paginator.module';
import {ViewStackActionComponent} from './controllers/view-stack-action.component';
import {ViewIndexActionComponent} from './controllers/view-index-action.component';
import {ModalsModule} from '../modals/modals.module';

@NgModule(
  {
    imports: [CommonModule, RoutingModule, SharedModule, AddressFormComponentModule, LeftMenuModule, PaginatorModule, ModalsModule],
    declarations: [CreateActionComponent, ListActionComponent, ViewIndexActionComponent, ViewHomeActionComponent, ViewStackActionComponent],
  }
)
export class CompanyModule {
}
