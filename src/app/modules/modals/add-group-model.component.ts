import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit
}                                from '@angular/core';
import {ModalService}            from './model-service';
import {ModalIdEnum}             from './enums/modal-id-enum';
import {AccountService}          from '../account/services/account-service';
import {ICurrentUser}            from '../account/interfaces/i-current-user';
import {FormGroup}               from '@angular/forms';
import {AddGroupForm}            from './forms/add-group-form';
import {GroupTypeEnum}           from '../group/enums/group-type-enum';
import {EnumService}             from '../../services/enum-service';
import {PeopleSizeEnum}          from '../company/enums/people-size-enum';
import {GroupService}            from '../group/services/group-service';
import {AbstractModalComponent}  from './abstract-modal.component';
import {IAddGroupModelComponent} from './interfaces/i-add-group-config';

@Component({
    selector:        'app-add-group-modal',
    templateUrl:     './views/add-group.html',
    providers:       [AddGroupForm],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGroupModelComponent extends AbstractModalComponent implements OnInit, IAddGroupModelComponent
{
    public isModalVisible            = false;
    public user: ICurrentUser | null = null;
    public form: FormGroup;
    public groupTypeEnum             = GroupTypeEnum;
    public groupSizes                = EnumService.enumAsArrayKV(PeopleSizeEnum);
    public objectKeys                = Object.keys;

    private companyId: number;
    private groupId: number;

    public constructor(
      cdr: ChangeDetectorRef,
      private modalService: ModalService,
      private accountService: AccountService,
      private groupService: GroupService,
      private addGroupForm: AddGroupForm
    )
    {
        super(cdr);
        this.form = addGroupForm.createCruForm();
    }

    public ngOnInit(): void
    {
        this.modalService.register(ModalIdEnum.ADD_GROUP, this);
        this.accountService.getStateAsObservable$().subscribe(user => this.user = user);
    }

    public open(companyId: number, groupId: number): void
    {
        this.cdrTick();
        if (!this.user)
        {
            console.error('AddGroupModelComponent.open() without user');

            return;
        }
        this.companyId      = companyId;
        this.groupId        = groupId;
        this.isModalVisible = true;
    }

    public close(): void
    {
        this.isModalVisible = false;
        // @todo: reset form (view)
        this.form.reset();
        this.cdrTick();
    }

    public onSubmit(): void
    {
        if (false === this.isModalVisible)
        {
            return;
        }

        if (this.form.valid)
        {
            const values = this.form.getRawValue();

            // @todo: need to connect to an address
            const formData = {
                parentId:         this.groupId,
                companyId:        this.companyId,
                typeId:           GroupTypeEnum.TECHNOLOGY,
                name:             values.name,
                membersOnStackId: values.groupSizeId
            };

            this.groupService.create(formData).subscribe(
              response =>
              {
                  if (response.success)
                  {
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
    public hasValidationError(fieldName: string): boolean
    {
        const field = this.addGroupForm.getField(fieldName);

        return field.invalid && field.touched;
    }
}
