import {Component, OnInit} from '@angular/core';
import {ModalService} from './model-service';
import {IModal} from './interfaces/i-modal';
import {ModalIdEnum} from './enums/modal-id-enum';

@Component({
  selector: 'app-tracked-review-display-modal',
  templateUrl: './views/protected-review-display-modal.html',
})
export class ProtectedReviewModelComponent implements IModal, OnInit {
  public id: number;

  isModalVisible = false;

  constructor(private modalService: ModalService) {
    this.id = ModalIdEnum.PROTECTED_REVIEW_DISPLAY;
  }

  ngOnInit(): void {
    this.modalService.add(this);
  }

  open(): void {
    this.isModalVisible = true;
  }

  close(): void {
    this.isModalVisible = false;
  }
}
