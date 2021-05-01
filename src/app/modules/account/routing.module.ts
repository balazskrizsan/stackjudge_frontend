import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginActionComponent} from './controllers/login-action.component';

const routes: Routes = [
  {path: '', component: LoginActionComponent},
  {path: 'login/:jwt', component: LoginActionComponent}
];

@NgModule(
  {
    imports: [ReactiveFormsModule, RouterModule.forChild(routes)],
    exports: [ReactiveFormsModule, RouterModule]
  }
)
export class RoutingModule {
}
