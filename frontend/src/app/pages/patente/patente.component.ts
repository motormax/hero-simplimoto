import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {fetchLead, LeadResponse} from '../../utils';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

interface FileData {
  data: string | ArrayBuffer;
  type: string;
  name: string;
}

@Component({
  selector: 'app-patente',
  templateUrl: './patente.component.html',
  styleUrls: ['./patente.component.css']
})
export class PatenteComponent implements OnInit {
  lead$: Observable<LeadResponse>;
  leadId: string;
  selectedOption = 'with_hero';
  frontDniBase64: FileData;
  backDniBase64: FileData;
  form: FormGroup;

  set option(value) {
    console.log(value);
    this.selectedOption = value;
  }

  get option() {
    return this.selectedOption;
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private formBuild: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuild.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', Validators.required],
      address: ['', Validators.required],
      floor: ['', Validators.required],
      postalCode: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
    this.lead$ = fetchLead.call(this);
  }

  continueWithoutHero() {
    const body = {
      plate_registration_data: {
        opt_in_or_out: 'personalPlateRegistration'
      }
    };
    this.http.post(`/api/leads/${this.leadId}/plate_registration`, body)
      .subscribe(() => this.router.navigate(['/envio', this.leadId]));
  }

  continueWithHero() {
    console.log('invalid');
    if (this.form.invalid) {
      console.log('invalid');
      return;
    }

    const body = {
      plate_registration_data: {
        opt_in_or_out: 'heroPlateRegistration',
        email: this.form.get('email').value,
        phone: `${this.form.get('phone').value}`,
        personal_data: {
          dni: `${this.form.get('dni').value}`,
          name: this.form.get('firstName').value,
          last_name: this.form.get('lastName').value,
        },
        address: {
          street: this.form.get('address').value,
          floor: this.form.get('floor').value,
          postal_code: `${this.form.get('postalCode').value}`,
          telephone_number: `${this.form.get('phone').value}`,
        },
        front_dni_image: {
          ...this.frontDniBase64
        },
        back_dni_image: {
          ...this.backDniBase64
        }
      }
    };
    this.http.post(`/api/leads/${this.leadId}/plate_registration`, body)
      .subscribe(() => this.router.navigate(['/envio', this.leadId]));
  }

  onFrontDniChange($event: Event) {
    this.readThis($event.target, (result) => {
      this.frontDniBase64 = result;
    });
  }

  onBackDniChange($event: Event) {
    this.readThis($event.target, (result) => {
      this.backDniBase64 = result;
    });
  }

  readThis(inputValue: any, onloadend: (result: FileData) => void): void {
    const file: File = inputValue.files[0];
    const reader: FileReader = new FileReader();

    reader.onloadend = () => {
      onloadend({
        data: reader.result,
        name: file.name,
        type: file.type
      });
    };
    reader.readAsDataURL(file);
  }
}
