import {NgModule}            from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule}        from '@angular/common';
import {RoutingModule}       from '../company/routing.module';
import {SharedModule}        from '../shared-module';

@NgModule({
    imports: [CommonModule, RoutingModule, SharedModule],
    exports: [ReactiveFormsModule],
})
export class LayoutModule
{
}
