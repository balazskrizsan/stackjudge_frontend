import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit
}                                from '@angular/core';
import {EnumService}             from '../../services/enum-service';
import {FormGroup}               from '@angular/forms';
import {ICurrentUser}            from '../account/interfaces/i-current-user';
import {AccountService}          from '../account/services/account-service';
import {IconViewComponent}       from '../commons/icon-view.component';
import {IIcon}                   from '../commons/interfaces/i-icon';
import {PeopleSizeEnum}          from '../company/enums/people-size-enum';
import {GroupTypeEnum}           from '../group/enums/group-type-enum';
import {GroupService}            from '../group/services/group-service';
import {ModalIdEnum}             from './enums/modal-id-enum';
import {AddGroupTechnologyForm}  from './forms/add-group-technology-form';
import {IAddGroupModelComponent} from './interfaces/i-add-group-config';
import {ModalService}            from './model-service';
import {AbstractModalComponent}  from './abstract-modal.component';

@Component({
    selector:        'app-add-group-technology-modal',
    templateUrl:     './views/add-group-technology.html',
    providers:       [AddGroupTechnologyForm, IconViewComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddGroupTechnologyModelComponent extends AbstractModalComponent implements OnInit, IAddGroupModelComponent
{
    public isModalVisible            = false;
    public user: ICurrentUser | null = null;
    private parentId: number;
    private companyId: number;
    public form: FormGroup;
    public groupSizes                = EnumService.enumAsArrayKV(PeopleSizeEnum);
    public objectKeys                = Object.keys;

    public constructor(
      cdr: ChangeDetectorRef,
      private modalService: ModalService,
      private accountService: AccountService,
      private groupService: GroupService,
      private addGroupTechnologyForm: AddGroupTechnologyForm
    )
    {
        super(cdr);
        this.form = addGroupTechnologyForm.createCruForm();
    }

    public ngOnInit(): void
    {
        this.modalService.register(ModalIdEnum.ADD_GROUP_TECHNOLOGY, this);
        this.accountService.getStateAsObservable$().subscribe(user => this.user = user);
    }

    public open(parentId: number, companyId: number): void
    {
        this.cdrTick();
        if (!this.user)
        {
            console.error('AddGroupTechnologyModelComponent.open() without user');

            return;
        }
        this.parentId       = parentId;
        this.companyId      = companyId;
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

            const formData = {
                parentId:         this.parentId,
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
        const field = this.addGroupTechnologyForm.getField(fieldName);

        return field.invalid && field.touched;
    }

    public getName(): string
    {
        return this.addGroupTechnologyForm.getField('name').value;
    }

    public setName(icon: IIcon): void
    {
        this.form.patchValue({name: icon.displayName});
    }
}
