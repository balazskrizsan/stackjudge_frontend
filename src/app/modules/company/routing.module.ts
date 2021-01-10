import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateActionComponent} from './controllers/create-action.component';
import {ListActionComponent} from './controllers/list-action.component';
import {ViewHomeActionComponent} from './controllers/view-home-action.component';
import {ViewStackActionComponent} from './controllers/view-stack-action.component';
import {ViewIndexActionComponent} from './controllers/view-index-action.component';

const routes: Routes = [
  {path: 'create', component: CreateActionComponent},
  {
    path: 'display/:id', component: ViewIndexActionComponent, children: [
      {path: '', component: ViewHomeActionComponent},
      {path: 'stack', component: ViewStackActionComponent},
    ]
  },
  {path: ':seekId', component: ListActionComponent}
];

@NgModule(
  {
    imports: [ReactiveFormsModule, RouterModule.forChild(routes)],
    exports: [ReactiveFormsModule, RouterModule]
  }
)
export class RoutingModule {
}
