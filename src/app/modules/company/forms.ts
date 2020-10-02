import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ICompany} from './interfaces/i-company';

@Injectable()
export class Forms {
  private CruFields: any = {
    id: new FormControl('', []),
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    companySizeId: new FormControl('', [Validators.required, Validators.minLength(1)]),
    itSizeId: new FormControl('', [Validators.required, Validators.minLength(1)]),
  };

  getFields(): any {
    return this.CruFields;
  }

  createCruForm(): FormGroup {
    return new FormGroup(
      {
        id: this.CruFields.id,
        name: this.CruFields.name,
        companySizeId: this.CruFields.companySizeId,
        itSizeId: this.CruFields.itSizeId,
      }
    );
  }

  getFieldValue(field: string): string {
    return this.getField(field).value;
  }

  getField(field: string): FormControl {
    return this.CruFields[field];
  }

  createPatchMap(site: ICompany): ICompany {
    return {
      id: site.id,
      name: site.name,
      companySizeId: site.companySizeId,
      itSizeId: site.itSizeId,
    };
  }
}
