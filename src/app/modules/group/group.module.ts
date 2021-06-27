import {NgModule} from '@angular/core';
import {DisplayNormalComponent} from './view-components/display-normal.component';
import {ReviewModule} from '../review/review-module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [ReviewModule, CommonModule],
  exports: [DisplayNormalComponent],
  declarations: [DisplayNormalComponent],
})
export class GroupModule {
}
