import {IRecursiveGroup} from '../../group/interfaces/i-recursive-group';

export interface IRecursiveGroupTree {
  recursiveGroup: IRecursiveGroup;
  children: Array<IRecursiveGroupTree>;
}
