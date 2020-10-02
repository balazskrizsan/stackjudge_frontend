import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Forms} from '../forms';
import {AddressForms} from '../../address/address-forms';
import {FormTypeEnum} from '../enums/form-type-enum';
import {ICompany} from '../interfaces/i-company';
import {CompanyService} from '../service/company-service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EnumService} from '../../../services/enum-service';
import {ItSizeEnum} from '../enums/it-size-enum';
import {CompanySizeEnum} from '../enums/company-size-enum';

@Component(
  {
    templateUrl: '../views/create-edit.html',
    styleUrls: [],
    providers: [Forms, AddressForms],
  }
)
export class CreateActionComponent {
  formTypeEnum = FormTypeEnum;
  company: ICompany = null;
  formType = FormTypeEnum.VIEW;
  form: FormGroup;
  submitted = false;
  serverSideError = false;
  itSizes = EnumService.enumAsArrayKV(ItSizeEnum);
  companySizes = EnumService.enumAsArrayKV(CompanySizeEnum);
  objectKeys = Object.keys;

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
    });
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (this.form.valid) {
      await this.companyService.create(this.clearRawValues(this.form.getRawValue())).subscribe(
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

  private clearRawValues(values: any): {} {
    delete values.company.id;

    if (values.address) {
      delete values.address.id;

      if (!values.address.manualMarkerLng) {
        delete values.address.manualMarkerLng;
      }

      if (!values.address.manualMarkerLat) {
        delete values.address.manualMarkerLat;
      }
    }

    return values;
  }

  isValidField(fieldName: string): boolean {
    const field = this.forms.getField(fieldName);

    return field.invalid && (field.touched);
  }
}
