export interface IModal {
  id: number;

  open(id: number, config?: {}): void;
}
