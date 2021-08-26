import {Component, Input}  from '@angular/core';
import {IconSearchService} from './services/icon-search-service';
import {IIcon}             from './interfaces/i-icon';

@Component({
    selector:    'app-icon-view',
    templateUrl: './views/icon-view.html'
})
export class IconViewComponent
{
    public isClassNameValid = false;
    public className        = '';
    public displayName      = '';
    @Input()
    public squareSize       = 50;

    @Input()
    public set partialIconName(value: string)
    {
        const icon: IIcon = value && value.length > 0 ? this.iconSearchService.find(value) : undefined;

        this.isClassNameValid = !!icon;
        this.className        = icon ? icon.class : '';
        this.displayName      = icon ? icon.displayName : '';
    }

    public constructor(private iconSearchService: IconSearchService)
    {
    }
}
