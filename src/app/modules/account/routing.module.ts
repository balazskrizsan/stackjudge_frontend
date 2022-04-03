import {NgModule}              from '@angular/core';
import {
    RouterModule,
    Routes
}                              from '@angular/router';
import {ReactiveFormsModule}   from '@angular/forms';
import {LoginActionComponent}  from './controllers/login-action.component';
import {LogoutActionComponent} from './controllers/logout-action.component';

const routes: Routes = [
    {path: '', component: LoginActionComponent},
    {path: 'login', component: LoginActionComponent},
    {path: 'logout', component: LogoutActionComponent},
];

@NgModule(
  {
      imports: [ReactiveFormsModule, RouterModule.forChild(routes)],
      exports: [ReactiveFormsModule, RouterModule]
  }
)
export class RoutingModule
{
}
