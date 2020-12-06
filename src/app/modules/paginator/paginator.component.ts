import {Component, Input, Output} from '@angular/core';
import {IPaginatorItem} from './interfaces/i-paginator-item';
import * as ItemTypeEnumImport from './enums/item-type-enum';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './templates/paginator.html',
})
export class PaginatorComponent {
  @Input() paginatorItems: Array<IPaginatorItem> = [];
  @Output() changePage = new EventEmitter<any>(true);
  itemTypeEnum = ItemTypeEnumImport.ItemTypeEnum;

  setPage(navigation: number): void {
    this.changePage.emit(navigation);
  }
}
