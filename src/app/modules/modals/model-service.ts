import {Injectable} from '@angular/core';
import {IModal} from './interfaces/i-modal';

@Injectable({providedIn: 'root'})
export class ModalService {
  private modals: IModal[] = []; // @todo: move to a state class

  public add(modal: IModal): void {
    this.modals.push(modal);
  }

  public open(id: number, config: {}): void {
    const modal = this.modals.find(m => m.id === id);

    if (!modal) {
      console.error('Modal not found with id#' + id);

      return;
    }

    modal.open(config);
  }
}
