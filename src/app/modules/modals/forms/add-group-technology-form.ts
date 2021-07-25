import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class AddGroupTechnologyForm {
  private CruFields: any = {
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    groupSizeId: new FormControl(0, [Validators.required, Validators.pattern(/^[1-7]$/)]),
  };

  public getFields(): any {
    return this.CruFields;
  }

  public createCruForm(): FormGroup {
    return new FormGroup(
      {
        name: this.CruFields.name,
        groupSizeId: this.CruFields.groupSizeId,
      }
    );
  }

  public getFieldValue(field: string): string {
    return this.getField(field).value;
  }

  public getField(field: string): FormControl {
    return this.CruFields[field];
  }
}
