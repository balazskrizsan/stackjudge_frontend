import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateActionComponent} from './controllers/create-action.component';
import {ListActionComponent} from './controllers/list-action.component';

const routes: Routes = [
  {path: 'create', component: CreateActionComponent},
  {path: '', component: ListActionComponent}
];

@NgModule(
  {
    imports: [ReactiveFormsModule, RouterModule.forChild(routes)],
    exports: [ReactiveFormsModule, RouterModule]
  }
)
export class RoutingModule {
}
