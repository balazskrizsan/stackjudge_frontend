import {ItemTypeEnum} from '../enums/item-type-enum';
import {NavigationEnum} from '../enums/navigation-enum';

export interface IPaginatorItem {
  typeId: ItemTypeEnum;
  pageNumber: string;
  navigation: NavigationEnum;
  active: boolean;
}
