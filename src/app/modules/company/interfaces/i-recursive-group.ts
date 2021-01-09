export interface IRecursiveGroup {
  id: number | null;
  name: string;
  companyId: number;
  parentId: number | null;
  depth: number;
  path: string;
}
