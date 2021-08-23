import {Component, Input} from '@angular/core';
import {IconSearchService} from './services/icon-search-service';
import {IIcon} from './interfaces/i-icon';

@Component({
  selector: 'app-icon-view',
  templateUrl: './views/icon-view.html'
})
export class IconViewComponent {
  public constructor(private iconSearchService: IconSearchService) {
  }

  @Input()
  public set partialIconName(value: string) {
    const icon: IIcon = value.length > 0 ? this.iconSearchService.find(value) : undefined;

    this.isClassNameValid = !!icon;
    this.className = icon ? icon.class : '';
  }
  @Input()
  public squareSize = 50;
  public isClassNameValid = false;
  public className = '';
}
