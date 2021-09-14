import {Component, Input} from '@angular/core';

@Component({
    selector:    'app-png-view',
    templateUrl: './views/png-view.html'
})
export class PngViewComponent
{
    @Input()
    public squareSize = 30;
    @Input()
    public class: string;
    @Input()
    public title      = '';
}
