export interface IRecursiveGroup {
  id: number | null;
  parentId: number | null;
  companyId: number;
  name: string;
  typeId: number;
  depth: number;
  path: string;
}
