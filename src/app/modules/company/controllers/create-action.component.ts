import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Forms} from '../forms';
import {AddressForms} from '../../address/address-forms';
import {FormTypeEnum} from '../enums/form-type-enum';
import {ICompany} from '../interfaces/i-company';
import {CompanyService} from '../service/company-service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EnumService} from '../../../services/enum-service';
import {PeopleSizeEnum} from '../enums/people-size-enum';

@Component(
  {
    templateUrl: '../views/create-edit.html',
    styleUrls: [],
    providers: [Forms, AddressForms],
  }
)
export class CreateActionComponent {
  public formTypeEnum = FormTypeEnum;
  public company: ICompany = null;
  public formType = FormTypeEnum.VIEW;
  public form: FormGroup;
  public submitted = false;
  public serverSideError = false;
  public peopleSizes = EnumService.enumAsArrayKV(PeopleSizeEnum);
  public objectKeys = Object.keys;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    protected forms: Forms,
    protected addressForms: AddressForms,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      company: this.forms.createCruForm(),
      address: [],
      companyLogo: new FormControl(null)
    });
  }

  public async onSubmit(): Promise<void> {
    this.submitted = true;
    if (this.form.valid) {
      await this.companyService.create(this.form.getRawValue()).subscribe(
        response => {
          if (response.success) {
            // this.router.navigate(['/company']);
          }
          this.serverSideError = true;
        }
      );

      return;
    }

    this.form.markAllAsTouched();
  }

  public uploadCompanyLogo(event): void {
    const companyLogo = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({companyLogo});
    this.form.get('companyLogo').updateValueAndValidity();
  }

  public hasValidationError(fieldName: string): boolean {
    const field = this.forms.getField(fieldName);

    return field.invalid && field.touched;
  }
}
