import {Component, OnInit} from '@angular/core';
import {ModalService} from './model-service';
import {IModal} from './interfaces/i-modal';
import {ModalIdEnum} from './enums/modal-id-enum';

@Component({
  selector: 'app-login-modal',
  template: '',
})
export class LoginModelComponent implements IModal, OnInit {
  public id: number;

  constructor(private modalService: ModalService) {
    this.id = ModalIdEnum.LOGIN;
  }

  ngOnInit(): void {
    this.modalService.add(this);
  }

  open(id: number): void {
  }
}
