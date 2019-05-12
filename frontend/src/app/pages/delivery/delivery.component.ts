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
  public latitude: number;
  public longitude: number;
  public zoom: number;

  set option(value) {
    this.selectedOption = value;
  }

  get option() {
    return this.selectedOption;
  }

  @ViewChild('search')
  public searchElementRef: ElementRef;
  private deliveryForm: FormGroup;

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
}
