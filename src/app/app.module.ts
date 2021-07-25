import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CompanyRepository} from './modules/company/repositories/company-repository';
import {CompanyService} from './modules/company/service/company-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {AddressFormComponentModule} from './modules/address/address-form.component.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http-service';
import {LocalStorageService} from './services/local-storage-services';
import {LeftMenuModule} from './modules/left-menu/left-menu.module';
import {PaginatorModule} from './modules/paginator/paginator.module';
import {ViewDataRegistryService} from './modules/company/service/view-data-registry-service';
import {AccountService} from './modules/account/services/account-service';
import {AccountRepository} from './modules/account/repositories/account-repository';
import {TokenInterceptorService} from './services/token-interceptor-service';
import {AccountState} from './modules/account/states/account-state';
import {ModalsModule} from './modules/modals/modals.module';
import {ReviewService} from './modules/review/services/review-service';
import {ReviewRepository} from './modules/review/repositories/review-repository';
import {ReviewModule} from './modules/review/review-module';
import {GroupModule} from './modules/group/group.module';
import {NotificationModule} from './modules/notification/notification.module';
import {NotificationService} from './modules/notification/services/notification-service';
import {NotificationRepository} from './modules/notification/repositories/notification-repository';
import {GroupService} from './modules/group/services/group-service';
import {GroupRepository} from './modules/group/repositories/group-repository';

@NgModule(
  {
    declarations: [AppComponent],
    imports: [
      BrowserAnimationsModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      RouterModule.forRoot(
        [
          {path: 'company', loadChildren: () => import('./modules/company/company.module').then(m => m.CompanyModule)},
          {path: 'account', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)}
        ],
        {preloadingStrategy: PreloadAllModules}
      ),
      AddressFormComponentModule,
      LeftMenuModule,
      PaginatorModule,
      ModalsModule,
      ReviewModule,
      GroupModule,
      NotificationModule,
    ],
    providers: [
      HttpService,
      LocalStorageService,
      CompanyService,
      CompanyRepository,
      ReviewService,
      ReviewRepository,
      AccountService,
      AccountRepository,
      AccountState,
      NotificationService,
      NotificationRepository,
      GroupService,
      GroupRepository,
      ViewDataRegistryService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
      }
    ],
    bootstrap: [AppComponent],
  }
)
export class AppModule {
}
