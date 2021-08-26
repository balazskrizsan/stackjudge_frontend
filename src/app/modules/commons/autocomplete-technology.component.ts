import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IconSearchService} from './services/icon-search-service';
import {IIcon} from './interfaces/i-icon';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './views/autocomplete.html'
})
export class AutocompleteTechnologyComponent {
  public listItems: Array<IIcon>;
  @Output()
  public selectLogoEvent = new EventEmitter<IIcon>(true);

  @Input()
  public set partialText(value: string) {
    if (!value) {
      return;
    }

    this.listItems = value.length > 0 ? this.iconSearchService.searchNLimited(value, 10) : undefined;
  }

  public constructor(private iconSearchService: IconSearchService) {
  }

  public selectLogo(item: IIcon): void {
    this.selectLogoEvent.emit(item);
    this.listItems = undefined;
  }
}
