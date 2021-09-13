import {NgModule}              from '@angular/core';
import {CommonModule}          from '@angular/common';
import {RoutingModule}         from '../company/routing.module';
import {SharedModule}          from '../shared-module';
import {FlashMessageComponent} from './flash-message.component';
import {CommonsModule}         from '../commons/commons.module';

@NgModule({
    imports:      [CommonModule, RoutingModule, SharedModule, CommonsModule],
    exports:      [FlashMessageComponent],
    declarations: [FlashMessageComponent]
})
export class FlashMessageModule
{
}
