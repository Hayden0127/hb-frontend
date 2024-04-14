import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MapsAPILoader } from '@agm/core';
import { Marker } from 'src/app/shared-models/onboarding/create-form';
import { ChargePointMarkerListResponseModel, ChargePointMarkerModel } from 'src/app/shared-models/cpmonitoring/chargepoint';
import { CpMonitoringService } from 'src/app/shared-service/cpmonitoring/cpmonitoring.service';
import { markerIconUrl } from 'src/app/shared-utilities/system-data';


@Component({
  selector: 'app-location',
  templateUrl: './cpmonitoring-map.component.html',
  styleUrls: ['./cpmonitoring-map.component.scss']
})
export class CpmonitoringMapComponent implements OnInit {
  title: string;
  description: string;

  pageInfo: any;
  zoom: number = 5.6;

  private geoCoder;
  marker: Marker = new Marker();
  address: string = null;
  cpMarker: ChargePointMarkerModel[] = [];
  markerIconUrl = markerIconUrl;
  selectedMarker: ChargePointMarkerModel = new ChargePointMarkerModel;

  @ViewChild('search') searchElementRef: ElementRef;

  constructor(
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private cpMonitoringService: CpMonitoringService,
  ) {
    this.title = 'Visualisation of Charging Point (CP) Monitoring';
    this.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus dolor non consectetur rutrum. Donec non tempor lacus, ac varius augue.';
  }
  ngOnInit(): void {
    this.marker.latitude = 3.837126400064506;
    this.marker.longitude = 108.35148062236087;
    this.loadAllCP();
  }

  monitorCP(id) {
    this.router.navigate(['cpmonitoring/chart'], { queryParams: { id: id } });
  }

  searchAddress() {
    const options = {
      componentRestrictions: { country: "my" },
    };
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, options);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.address = place.formatted_address;
          this.marker.latitude = place.geometry.location.lat();
          this.marker.longitude = place.geometry.location.lng();
          this.zoom = 14;
        });
      });
    });
  }

  getAddress() {
    this.geoCoder = new google.maps.Geocoder();
    this.geoCoder.geocode({ 'location': { lat: this.marker.latitude, lng: this.marker.longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      }
    });
  }

  loadAllCP() {
    this.cpMonitoringService.getAllCPMarker().subscribe(data => {
      this.cpMarker = data.chargePointMarkerList;
      this.marker.latitude = this.cpMarker[this.cpMarker.length - 1].latitude;
      this.marker.longitude = this.cpMarker[this.cpMarker.length - 1].longitude;
      this.getAddress()
    })
  }

  mapReady(map: any) {
    map.setOptions({
      styles: [
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }]
        }
      ]
    });
  }

  focusMarker(index) {
    // this.cpMarker.forEach(x => x.isClicked = false);
    this.cpMarker[index].isClicked = !this.cpMarker[index].isClicked;
    // //TODO: search CP Site
    this.selectedMarker = this.cpMarker[index];
  }
}
