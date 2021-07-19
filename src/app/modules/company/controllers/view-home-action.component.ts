import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {Router} from '@angular/router';
import {Forms} from '../forms';
import {AddressForms} from '../../address/address-forms';
import {ICompany} from '../interfaces/i-company';
import {ICompanyStatistic} from '../interfaces/i-company-statistic';
import {IRecursiveGroupTree} from '../interfaces/i-recursive-group-tree';
import {ViewDataRegistryService} from '../service/view-data-registry-service';
import {IAddress} from '../../address/interfaces/i-address';

declare let google: any;

@Component(
  {
    templateUrl: '../views/view-home.html',
    styleUrls: ['../styles/styles.scss'],
    providers: [Forms, AddressForms],
  }
)
export class ViewHomeActionComponent {
  public company: ICompany = null;
  public companyStatistics: ICompanyStatistic = null;
  public companyGroups: Array<IRecursiveGroupTree> = null;
  public companyAddresses: Array<IAddress> = null;
  @ViewChildren('maps')
  public maps!: QueryList<ElementRef<HTMLLIElement>>;

  public constructor(
    private router: Router,
    private viewDataRegistryService: ViewDataRegistryService
  ) {
    this.viewDataRegistryService.get().subscribe(res => {
      this.company = res.company;
      this.companyGroups = res.companyGroups;
      this.companyStatistics = res.companyStatistic;
      this.companyAddresses = res.companyAddresses;
    });

    // @todo: create listener for the ngif
    setTimeout(() => {
      this.initMaps();
    }, 500);
  }

  private initMaps(): void {
    this.maps.forEach((map, i) => {
      const address = this.companyAddresses[i];

      const position = {lat: address.markerLat, lng: address.markerLng};
      const mapOptions = {
        center: position,
        zoom: 16,
        scrollwheel: false,
        noClear: true,
        mapTypeId: 'satellite',
        streetViewControl: false,
        rotateControl: false,
        zoomControl: true,
        mapTypeControl: true,
        fullscreenControl: true,
        disableDefaultUI: true,
        mapTypeControlOptions: {mapTypeIds: []},
        scaleControl: false,
        keyboardShortcuts: false
      };
      const mapDiv = map.nativeElement.children.namedItem('map-' + address.id);

      const googleMap = new google.maps.Map(mapDiv, mapOptions);
      const marker = new google.maps.Marker({
        position,
        map,
        title: 'Office'
      });
      marker.setMap(googleMap);
    });
  }
}
