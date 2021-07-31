import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AddressForms} from './address-forms';
import {FormTypeEnum} from '../company/enums/form-type-enum';

declare let google: any;

const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'app-address-form',
  templateUrl: './templates/create-edit.html',
  styleUrls: ['./templates/create-edit.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true
    }
  ]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy, OnInit {
  @Input()
  public formType;
  @Input()
  public submitted;
  public formTypeEnum = FormTypeEnum;
  public form: FormGroup;
  public formFields;
  public subscriptions: Subscription[] = [];

  public constructor(private formBuilder: FormBuilder, private forms: AddressForms) {
    this.formFields = forms.getFields();
    this.form = this.formBuilder.group(this.formFields);

    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  public ngOnInit(): void {
    this.initMap();

    resolvedPromise.then(() => {
      this.form.get('fullAddress').setValue('');
    });
  }

  public initMap(): void {
    const position = {lat: 47.497912, lng: 19.040235};
    const mapOptions = {
      center: position,
      zoom: 12,
      scrollwheel: false,
      noClear: true
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const marker = new google.maps.Marker({
      position,
      map,
      draggable: true,
      title: 'Correct the position.'
    });

    const input = document.getElementById('address-search') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      marker.setPosition(place.geometry.location);

      this.setBasicAddress(place.geometry.location.lat(), place.geometry.location.lng(), place.formatted_address);
    });

    marker.addListener('mouseup', () => {
      this.setManualPosition(marker.getPosition().lat(), marker.getPosition().lng());
    });
  }

  public setManualPosition(lat: number, lng: number): void {
    this.form.patchValue({
      manualMarkerLat: lat,
      manualMarkerLng: lng,
    });
  }

  public setBasicAddress(markerLat, markerLng, fullAddress): void {
    this.form.patchValue({
      markerLng,
      markerLat,
      fullAddress
    });
  }

  get value(): any {
    return this.form.value;
  }

  set value(value: any) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => {
  }
  onTouched: any = () => {
  }

  public registerOnChange(fn): void {
    this.onChange = fn;
  }

  public writeValue(value): void {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  public registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  public validate(_: FormControl): any {
    return this.form.valid ? null : {passwords: {valid: false}};
  }
}
