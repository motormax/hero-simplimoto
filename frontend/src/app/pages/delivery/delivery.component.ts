import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {fetchLead, LeadResponse} from '../../utils';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
// @ts-ignore
import { } from 'googlemaps';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  lead$: Observable<LeadResponse>;
  leadId: string;
  selectedOption = 'delivery';
  selectedPickupOption?: any;
  pickupOptions = [
    {
      value: 'Showroom Hero Vicente Lopez, Av Del Libertador 1150, Buenos Aires, Vicente Lopez, 4796-5514',
      title: 'Showroom Hero Vicente Lopez',
      latitude: -34.5232709,
      longitude: -58.473125
    },
    {
      value: 'Showroom Hero Lanus, Eva Perón 38, Buenos Aires, Lanus Oeste, 21218018',
      title: 'Showroom Hero Lanus',
      latitude: -34.698525,
      longitude: -58.3917687
    }
  ];
  public latitude: number;
  public longitude: number;
  public pickupLatitude: number;
  public pickupLongitude: number;
  public zoom: number;

  set option(value) {
    this.selectedOption = value;
  }

  get option() {
    return this.selectedOption;
  }

  set pickupOption(value) {
    console.log(value);
    console.log(typeof value);
    console.log(JSON.stringify(value));
    this.selectedPickupOption = this.pickupOptions.find(o => o.title === value);
    if (this.selectedPickupOption) {
      this.pickupLatitude = this.selectedPickupOption.latitude;
      this.pickupLongitude = this.selectedPickupOption.longitude;
    }
    console.log(this.selectedPickupOption);
    console.log(JSON.stringify(this.selectedPickupOption));
  }

  get pickupOption() {
    return this.selectedPickupOption && this.selectedPickupOption.title;
  }

  @ViewChild('search')
  public searchElementRef: ElementRef;
  deliveryForm: FormGroup;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.lead$ = fetchLead.call(this);
    this.deliveryForm = this.formBuilder.group({
      address: ['', Validators.required],
      floor: ['', Validators.required],
      postalCode: ['', Validators.required],
      phone: ['', Validators.required]
    });
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  continueWithDelivery() {
    if (this.deliveryForm.invalid) {
      console.log('Invalid');
      return;
    }

    const body = {
      delivery_choice: {
        address: {
          complements: `${this.deliveryForm.get('floor').value}`,
          number: '',
          postal_code: `${this.deliveryForm.get('postalCode').value}`,
          street: `${this.deliveryForm.get('address').value}`,
          telephone_number: `${this.deliveryForm.get('phone').value}`,
          town: ''
        }
      }
    };

    this.http.post(`/api/leads/${this.leadId}/delivery_choice`, body)
      .subscribe(() => this.router.navigate(['/checkout', this.leadId]));
  }

  continueWithPickup() {
    if (!this.selectedPickupOption) {
      return;
    }

    const body = {
      delivery_choice: {
        pickup_location: this.selectedPickupOption.title
      }
    };

    this.http.post(`/api/leads/${this.leadId}/delivery_choice`, body)
      .subscribe(() => this.router.navigate(['/checkout', this.leadId]));
  }
}
