import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationHeaderDisplayComponent} from './view-components/notification-header-display.component';
import {NotificationProtectedViewSmallComponent} from './view-components/protected-view-small.component';

@NgModule({
  imports: [CommonModule],
  exports: [NotificationHeaderDisplayComponent, NotificationProtectedViewSmallComponent],
  declarations: [NotificationHeaderDisplayComponent, NotificationProtectedViewSmallComponent],
})
export class NotificationModule {
}
