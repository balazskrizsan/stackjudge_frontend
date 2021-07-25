import {Component, OnInit} from '@angular/core';
import {ModalService} from './model-service';
import {IModal} from './interfaces/i-modal';
import {ModalIdEnum} from './enums/modal-id-enum';
import {AccountService} from '../account/services/account-service';
import {ICurrentUser} from '../account/interfaces/i-current-user';
import {FormGroup} from '@angular/forms';
import {AddGroupForm} from './forms/add-group-form';
import {IAddGroupConfig} from './interfaces/i-add-group-config';
import {GroupTypeEnum} from '../group/enums/group-type-enum';
import {EnumService} from '../../services/enum-service';
import {PeopleSizeEnum} from '../company/enums/people-size-enum';
import {GroupService} from '../group/services/group-service';

@Component({
  selector: 'app-add-group-modal',
  templateUrl: './views/add-group.html',
  providers: [AddGroupForm]
})
export class AddGroupModelComponent implements IModal, OnInit {
  public id: number;
  public isModalVisible = false;
  public user: ICurrentUser | null = null;
  private config: IAddGroupConfig;
  public form: FormGroup;
  public groupTypeEnum = GroupTypeEnum;
  public groupSizes = EnumService.enumAsArrayKV(PeopleSizeEnum);
  public objectKeys = Object.keys;

  public constructor(
    private modalService: ModalService,
    private accountService: AccountService,
    private groupService: GroupService,
    private addGroupForm: AddGroupForm
  ) {
    this.id = ModalIdEnum.ADD_GROUP;
    this.form = addGroupForm.createCruForm();
  }

  public ngOnInit(): void {
    this.modalService.add(this);
    this.accountService.getStateAsObservable$().subscribe(user => this.user = user);
  }

  public open(config: IAddGroupConfig): void {
    if (!this.user) {
      console.error('AddGroupModelComponent.open() without user');

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

    if (this.form.valid) {
      const values = this.form.getRawValue();

      // @todo: need to connect to an address
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
            // @todo: handling page reload
          }
          // @todo: display unknown error
        }
      );

      return;
    }

    this.form.markAllAsTouched();
  }

  // @todo: ngClass error not working properly
  public isValidField(fieldName: string): boolean {
    const field = this.addGroupForm.getField(fieldName);

    return field.invalid && (field.touched);
  }
}
