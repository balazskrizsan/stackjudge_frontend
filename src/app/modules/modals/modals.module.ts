import {NgModule}                             from '@angular/core';
import {ReactiveFormsModule}                  from '@angular/forms';
import {CommonModule}                         from '@angular/common';
import {RoutingModule}                        from '../company/routing.module';
import {SharedModule}                         from '../shared-module';
import {WriteGroupReviewModelComponent}       from './write-group-review-model.component';
import {ProtectedReviewDisplayModelComponent} from './protected-review-display-model.component';
import {ReviewModule}                         from '../review/review-module';
import {AddGroupModelComponent}               from './add-group-model.component';
import {AddGroupTechnologyModelComponent}     from './add-group-technology-model.component';
import {CommonsModule}                        from '../commons/commons.module';
import {OwnCompanyModalComponent}             from './own-company-modal.component';

@NgModule({
    imports:      [CommonModule, RoutingModule, SharedModule, ReactiveFormsModule, ReviewModule, CommonsModule],
    exports:      [
        ReactiveFormsModule,
        WriteGroupReviewModelComponent,
        ProtectedReviewDisplayModelComponent,
        AddGroupModelComponent,
        AddGroupTechnologyModelComponent,
        OwnCompanyModalComponent,
    ],
    declarations: [
        WriteGroupReviewModelComponent,
        ProtectedReviewDisplayModelComponent,
        AddGroupModelComponent,
        AddGroupTechnologyModelComponent,
        OwnCompanyModalComponent
    ]
})
export class ModalsModule
{
}
