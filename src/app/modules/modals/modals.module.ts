import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RoutingModule} from '../company/routing.module';
import {SharedModule} from '../shared-module';
import {StackReviewModelComponent} from './stack-review-model.component';
import {ProtectedReviewModelComponent} from './protected-review-model.component';
import {ReviewModule} from '../review/review-module';

@NgModule({
  imports: [CommonModule, RoutingModule, SharedModule, ReactiveFormsModule, ReviewModule],
  exports: [ReactiveFormsModule, StackReviewModelComponent, ProtectedReviewModelComponent],
  declarations: [StackReviewModelComponent, ProtectedReviewModelComponent]
})
export class ModalsModule {
}
