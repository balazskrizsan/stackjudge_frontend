import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class StackReviewForm {
  private CruFields: any = {
    visibility: new FormControl('0', [Validators.required, Validators.pattern(/^[1-3]$/)]),
    rate: new FormControl('0', [Validators.required, Validators.pattern(/^[1-5]$/)]),
    review: new FormControl('', [Validators.required, Validators.minLength(10)]),
  };

  getFields(): any {
    return this.CruFields;
  }

  createCruForm(): FormGroup {
    return new FormGroup(
      {
        visibility: this.CruFields.visibility,
        rate: this.CruFields.rate,
        review: this.CruFields.review,
      }
    );
  }

  getFieldValue(field: string): string {
    return this.getField(field).value;
  }

  getField(field: string): FormControl {
    return this.CruFields[field];
  }
}
