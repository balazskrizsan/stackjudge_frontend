import {Component, OnInit} from '@angular/core';
import {ModalService} from './model-service';
import {IModal} from './interfaces/i-modal';
import {ModalIdEnum} from './enums/modal-id-enum';

@Component({
  selector: 'app-stack-review-modal',
  templateUrl: './views/stack-review.html'
})
export class StackReviewModelComponent implements IModal, OnInit {
  public id: number;
  public isModalVisible = false;

  constructor(private modalService: ModalService) {
    this.id = ModalIdEnum.WRITE_STACK_REVIEW;
  }

  ngOnInit(): void {
    this.modalService.add(this);
  }

  open(id: number, config: {}): void {
    this.isModalVisible = true;
  }

  close(): void {
    this.isModalVisible = false;
  }
}
