import {Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy} from '@angular/core';
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

  constructor(private modalService: ModalService, private modalContainer: ElementRef) {
    this.id = ModalIdEnum.write_stack_review;
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
