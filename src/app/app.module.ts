import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CompanyRepository} from './modules/company/repositories/company-repository';
import {CompanyService} from './modules/company/service/company-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {CompanyModule} from './modules/company/company.module';
import {AddressFormComponentModule} from './modules/address/address-form.component.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http-service';
import {LocalStorageService} from './services/local-storage-services';
import {LeftMenuComponentModule} from './modules/left-menu/left-menu.component.module';

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
          {path: 'company', loadChildren: () => CompanyModule},
        ],
        {preloadingStrategy: PreloadAllModules}
      ),
      // NgbModule,
      AddressFormComponentModule,
      LeftMenuComponentModule
    ],
    providers: [
      HttpService,
      LocalStorageService,
      CompanyService,
      CompanyRepository
    ],
    bootstrap: [AppComponent],
  }
)
export class AppModule {
}
