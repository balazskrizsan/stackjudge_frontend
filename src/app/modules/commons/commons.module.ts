import {NgModule}                        from '@angular/core';
import {ReactiveFormsModule}             from '@angular/forms';
import {CommonModule}                    from '@angular/common';
import {RoutingModule}                   from '../company/routing.module';
import {SharedModule}                    from '../shared-module';
import {IconViewComponent}               from './icon-view.component';
import {IconSearchService}               from './services/icon-search-service';
import {AutocompleteTechnologyComponent} from './autocomplete-technology.component';
import {PngViewComponent}                from './png-view.component';

@NgModule({
    imports:      [CommonModule, RoutingModule, SharedModule, ReactiveFormsModule],
    exports:      [ReactiveFormsModule, IconViewComponent, PngViewComponent, AutocompleteTechnologyComponent],
    declarations: [IconViewComponent, PngViewComponent, AutocompleteTechnologyComponent],
    providers:    [IconSearchService]
})
export class CommonsModule
{
}
