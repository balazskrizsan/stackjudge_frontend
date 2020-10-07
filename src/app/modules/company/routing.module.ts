import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateActionComponent} from './controllers/create-action.component';
import {ListActionComponent} from './controllers/list-action.component';
import {ViewActionComponent} from './controllers/view-action.component';

const routes: Routes = [
  {path: 'create', component: CreateActionComponent},
  {path: 'display/:id', component: ViewActionComponent},
  {path: '', component: ListActionComponent},
];

@NgModule(
  {
    imports: [ReactiveFormsModule, RouterModule.forChild(routes)],
    exports: [ReactiveFormsModule, RouterModule]
  }
)
export class RoutingModule {
}
