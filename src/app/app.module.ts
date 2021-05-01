import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CompanyRepository} from './modules/company/repositories/company-repository';
import {CompanyService} from './modules/company/service/company-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {AddressFormComponentModule} from './modules/address/address-form.component.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http-service';
import {LocalStorageService} from './services/local-storage-services';
import {LeftMenuModule} from './modules/left-menu/left-menu.module';
import {PaginatorModule} from './modules/paginator/paginator.module';
import {ViewDataRegistryService} from './modules/company/service/view-data-registry-service';

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
      // NgbModule,
      AddressFormComponentModule,
      LeftMenuModule,
      PaginatorModule
    ],
    providers: [
      HttpService,
      LocalStorageService,
      CompanyService,
      CompanyRepository,
      ViewDataRegistryService
    ],
    bootstrap: [AppComponent],
  }
)
export class AppModule {
}
