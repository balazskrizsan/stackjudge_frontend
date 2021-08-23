import {Component, OnInit} from '@angular/core';
import {ModalService} from './model-service';
import {IModal} from './interfaces/i-modal';
import {ModalIdEnum} from './enums/modal-id-enum';
import {AccountService} from '../account/services/account-service';
import {ICurrentUser} from '../account/interfaces/i-current-user';
import {FormGroup} from '@angular/forms';
import {IAddGroupConfig} from './interfaces/i-add-group-config';
import {GroupTypeEnum} from '../group/enums/group-type-enum';
import {EnumService} from '../../services/enum-service';
import {PeopleSizeEnum} from '../company/enums/people-size-enum';
import {AddGroupTechnologyForm} from './forms/add-group-technology-form';
import {GroupService} from '../group/services/group-service';
import {IconViewComponent} from '../commons/icon-view.component';

@Component({
  selector: 'app-add-group-technology-modal',
  templateUrl: './views/add-group-technology.html',
  providers: [AddGroupTechnologyForm, IconViewComponent]
})
export class AddGroupTechnologyModelComponent implements IModal, OnInit {
  public id: number;
  public isModalVisible = false;
  public user: ICurrentUser | null = null;
  private config: IAddGroupConfig;
  public form: FormGroup;
  public groupSizes = EnumService.enumAsArrayKV(PeopleSizeEnum);
  public objectKeys = Object.keys;

  public constructor(
    private modalService: ModalService,
    private accountService: AccountService,
    private groupService: GroupService,
    private addGroupTechnologyForm: AddGroupTechnologyForm
  ) {
    this.id = ModalIdEnum.ADD_GROUP_TECHNOLOGY;
    this.form = addGroupTechnologyForm.createCruForm();
  }

  public ngOnInit(): void {
    this.modalService.add(this);
    this.accountService.getStateAsObservable$().subscribe(user => this.user = user);
  }

  public open(config: IAddGroupConfig): void {
    if (!this.user) {
      console.error('AddGroupTechnologyModelComponent.open() without user');

      return;
    }
    this.config = config;
    this.isModalVisible = true;
  }

  public close(): void {
    this.isModalVisible = false;
    // @todo: reset form (view)
    this.form.reset();
  }

  public onSubmit(): void {
    if (false === this.isModalVisible) {
      return;
    }

    console.log(this.form.valid);
    if (this.form.valid) {
      const values = this.form.getRawValue();

      const formData = {
        parentId: this.config.groupId,
        companyId: this.config.companyId,
        typeId: GroupTypeEnum.TECHNOLOGY,
        name: values.name,
        membersOnStackId: values.groupSizeId
      };

      this.groupService.create(formData).subscribe(
        response => {
          if (response.success) {
            this.close();
            // s@todo: handling page reload
          }
          // @todo: display unknown error
        }
      );

      return;
    }

    this.form.markAllAsTouched();
  }

  // @todo: ngClass error not working properly
  public hasValidationError(fieldName: string): boolean {
    const field = this.addGroupTechnologyForm.getField(fieldName);

    return field.invalid && field.touched;
  }

  public getName(): string {
    return this.addGroupTechnologyForm.getField('name').value;
  }
}
