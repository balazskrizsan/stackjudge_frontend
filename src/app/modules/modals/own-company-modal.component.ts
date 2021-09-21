import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit
}                                  from '@angular/core';
import {ModalService}              from './model-service';
import {ModalIdEnum}               from './enums/modal-id-enum';
import {AccountService}            from '../account/services/account-service';
import {ICurrentUser}              from '../account/interfaces/i-current-user';
import {FormGroup}                 from '@angular/forms';
import {OwnCompanyForm}            from './forms/own-company-form';
import {ICompany}                  from '../company/interfaces/i-company';
import {OwnService}                from '../company/service/own-service';
import {FlashMessageService}       from '../flash-message/services/flash-message-service';
import {FlashMessageLevelEnum}     from '../flash-message/enums/flash-message-level-enum';
import {AbstractModalComponent}    from './abstract-modal.component';
import {IOwnCompanyModalComponent} from './interfaces/i-own-company-modal-component';

@Component({
    selector:        'app-own-company-modal',
    templateUrl:     './views/own-company.html',
    providers:       [OwnCompanyForm],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OwnCompanyModalComponent extends AbstractModalComponent implements OnInit, IOwnCompanyModalComponent
{
    public isModalVisible            = false;
    public user: ICurrentUser | null = null;
    public form: FormGroup;

    private company: ICompany;

    public constructor(
      cdr: ChangeDetectorRef,
      private modalService: ModalService,
      private accountService: AccountService,
      private ownService: OwnService,
      private ownCompanyForm: OwnCompanyForm,
      private flashMessageService: FlashMessageService
    )
    {
        super(cdr);
        this.form = ownCompanyForm.createCruForm();
    }

    public ngOnInit(): void
    {
        this.modalService.register(ModalIdEnum.OWN_COMPANY, this);
        this.accountService.getStateAsObservable$().subscribe(user => this.user = user);
    }

    public open(company: ICompany): void
    {
        this.cdrTick();
        if (!this.user)
        {
            console.error('OwnCompanyModalComponent.open() without user');

            return;
        }
        this.company        = company;
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
            const postData     = this.form.getRawValue();
            postData.companyId = this.company.id;


            this.ownService.request(postData).subscribe(response =>
            {
                if (response.success)
                {
                    this.flashMessageService.push({
                        messageLevel: FlashMessageLevelEnum.OK,
                        message:      'We have sent you a confirmation email.',
                    });

                    this.close();
                    return;
                }

                // @todo: error handling
            });

            return;
        }

        this.form.markAllAsTouched();
    }

    // @todo: ngClass error not working properly
    public hasValidationError(fieldName: string): boolean
    {
        const field = this.ownCompanyForm.getField(fieldName);

        return field.invalid && field.touched;
    }

    public getCompanyDomainAsAddressPostfix(): string
    {
        console.log(this.company);
        return 'asd';
        // return this.company;
        // return this.company.domain.replace(/^https?:\/\//i, '');
    }
}
