import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IAddress} from './interfaces/i-address';
import {AbstractForm} from '../../forms/abstract-form';

@Injectable()
export class AddressForms extends AbstractForm{
  private CruFields: any = {
    id: new FormControl('', []),
    fullAddress: new FormControl('', [Validators.required, Validators.minLength(10)]),
    markerLng: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,3}\.\d{1,20}/)]),
    markerLat: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,3}\.\d{1,20}/)]),
    manualMarkerLng: new FormControl('', [Validators.pattern(/^\d{1,3}\.\d{1,20}/)]),
    manualMarkerLat: new FormControl('', [Validators.pattern(/^\d{1,3}\.\d{1,20}/)]),
  };

  public getFields(): any {
    return this.CruFields;
  }

  public createCruForm(): FormGroup {
    return new FormGroup(
      {
        id: this.CruFields.id,
        fullAddress: this.CruFields.fullAddress,
        markerLat: this.CruFields.markerLat,
        markerLng: this.CruFields.markerLng,
        manualMarkerLat: this.CruFields.manualMarkerLat,
        manualMarkerLng: this.CruFields.manualMarkerLng,
      }
    );
  }

  public createPatchMap(address: IAddress): IAddress {
    return {
      id: address.id,
      fullAddress: address.fullAddress,
      markerLat: address.markerLat,
      markerLng: address.markerLng,
      manualMarkerLat: address.manualMarkerLat,
      manualMarkerLng: address.manualMarkerLng,
    };
  }
}
