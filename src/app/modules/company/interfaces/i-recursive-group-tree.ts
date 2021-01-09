import {IRecursiveGroup} from './i-recursive-group';

export interface IRecursiveGroupTree {
  recursiveGroup: IRecursiveGroup;
  children: Array<IRecursiveGroupTree>;
}
