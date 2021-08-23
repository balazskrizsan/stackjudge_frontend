import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RoutingModule} from '../company/routing.module';
import {SharedModule} from '../shared-module';
import {IconViewComponent} from './icon-view.component';
import {IconSearchService} from './services/icon-search-service';

@NgModule({
  imports: [CommonModule, RoutingModule, SharedModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, IconViewComponent],
  declarations: [IconViewComponent],
  providers: [IconSearchService]
})
export class CommonsModule {
}
