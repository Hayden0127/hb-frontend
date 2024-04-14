import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { Marker } from 'src/app/shared-models/onboarding/create-form';
import { CreateFormService, Location } from 'src/app/shared-service/onboarding/create-form.service';
import { markerIconUrl } from 'src/app/shared-utilities/system-data';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  zoom: number = 5.6;
  private geoCoder;
  marker: Marker = new Marker();
  address: string = null;
  city: string = null;
  state: string = null;
  isMarkerVisible: boolean = false;
  showLocationDetails: boolean = false;
  country: string = null;
  markerIconUrl = markerIconUrl;

  viewMode: string;

  @ViewChild('search') searchElementRef: ElementRef;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private createFormService: CreateFormService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.viewMode = params.view
    })

    var sessionData = this.createFormService.getLocationData();
    if (sessionData.latitude != null) {
      this.marker.latitude = sessionData.latitude;
      this.marker.longitude = sessionData.longitude;
      this.address = sessionData.address;
      this.marker.draggable = true;
      this.zoom = 18;
      this.isMarkerVisible = true;
    }

    if (sessionData.latitude == null) {
      this.marker.latitude = 3.837126400064506;
      this.marker.longitude = 108.35148062236087;
      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;
      });
    }
    setTimeout(() => this.searchAddress(), 100)
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.latitude = position.coords.latitude;
        this.marker.longitude = position.coords.longitude;
        this.marker.draggable = true;
        this.zoom = 18;
        this.isMarkerVisible = true;
        this.getAddress();
      });
    }
  }

  markerDrag($event: any) {
    this.isMarkerVisible = true;
    this.marker.latitude = $event.coords.lat;
    this.marker.longitude = $event.coords.lng;
    this.geoCoder = new google.maps.Geocoder();
    this.getAddress();
    this.zoom = 18;
  }

  next() {
    var locationData: Location = {
      latitude: this.marker.latitude,
      longitude: this.marker.longitude,
      address: this.address,
      country: this.country,
      city: this.city,
      state: this.state
    };
    this.createFormService.setLocationData(locationData);
    this.router.navigate([`overview/onboarding/${this.viewMode}/details`], { queryParams: { view: this.viewMode }, skipLocationChange: true });
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
          this.city = place.address_components.find(x => x.types.includes('locality')).long_name;
          this.state = place.address_components.find(x => x.types.includes('administrative_area_level_1')).long_name;
          this.country = place.address_components.find(x => x.types.includes('country')).long_name;
          this.marker.latitude = place.geometry.location.lat();
          this.marker.longitude = place.geometry.location.lng();
          this.zoom = 18;
          this.isMarkerVisible = true;
        });
      });
    });
  }

  getAddress() {
    this.geoCoder.geocode({ 'location': { lat: this.marker.latitude, lng: this.marker.longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          this.city = results[0].address_components.find(x => x.types.includes('locality')).long_name;
          this.state = results[0].address_components.find(x => x.types.includes('administrative_area_level_1')).long_name;
          this.country = results[0].address_components.find(x => x.types.includes('country')).long_name;
        } else {
          window.alert('No results found');
        }
      }
    });
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

}
