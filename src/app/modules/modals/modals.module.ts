import {NgModule}                         from '@angular/core';
import {ReactiveFormsModule}              from '@angular/forms';
import {CommonModule}                     from '@angular/common';
import {RoutingModule}                    from '../company/routing.module';
import {SharedModule}                     from '../shared-module';
import {StackReviewModelComponent}        from './stack-review-model.component';
import {ProtectedReviewModelComponent}    from './protected-review-model.component';
import {ReviewModule}                     from '../review/review-module';
import {AddGroupModelComponent}           from './add-group-model.component';
import {AddGroupTechnologyModelComponent} from './add-group-technology-model.component';
import {CommonsModule}                    from '../commons/commons.module';
import {OwnCompanyModalComponent}         from './own-company-modal.component';

@NgModule({
    imports:      [CommonModule, RoutingModule, SharedModule, ReactiveFormsModule, ReviewModule, CommonsModule],
    exports:      [
        ReactiveFormsModule,
        StackReviewModelComponent,
        ProtectedReviewModelComponent,
        AddGroupModelComponent,
        AddGroupTechnologyModelComponent,
        OwnCompanyModalComponent,
    ],
    declarations: [
        StackReviewModelComponent,
        ProtectedReviewModelComponent,
        AddGroupModelComponent,
        AddGroupTechnologyModelComponent,
        OwnCompanyModalComponent
    ]
})
export class ModalsModule
{
}
