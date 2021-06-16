import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RoutingModule} from '../company/routing.module';
import {SharedModule} from '../shared-module';
import {StackReviewModelComponent} from './stack-review-model.component';
import {LoginModelComponent} from './login-model.component';

@NgModule({
  imports: [CommonModule, RoutingModule, SharedModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, StackReviewModelComponent, LoginModelComponent],
  declarations: [StackReviewModelComponent, LoginModelComponent]
})
export class ModalsModule {
}
