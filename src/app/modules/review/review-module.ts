import {NgModule} from '@angular/core';
import {DisplaySmallComponent} from './view-components/display-small.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [DisplaySmallComponent],
  declarations: [DisplaySmallComponent]
})
export class ReviewModule {
}
