import { Component, OnInit } from '@angular/core';
import {fetchLead, LeadResponse} from '../../utils';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-used',
  templateUrl: './used.component.html',
  styleUrls: ['./used.component.css']
})
export class UsedComponent implements OnInit {
  sellForm: FormGroup;
  submitted = false;
  lead$: Observable<LeadResponse>;
  leadId: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private formBuild: FormBuilder) { }

  ngOnInit() {
    this.sellForm = this.formBuild.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      plate: ['', Validators.required]
    });
    this.lead$ = fetchLead.call(this);
  }

  // convenience getter for easy access to form fields
  get f() { return this.sellForm.controls; }

  submit() {
    this.submitted = true;
    if (this.sellForm.invalid) {
      console.log('invalid');
      return;
    }

    const body = {
      trade_in_data: {
        brand: this.sellForm.get('brand').value,
        email: this.sellForm.get('email').value,
        lead_id: this.leadId,
        license_plate: this.sellForm.get('plate').value,
        location: this.sellForm.get('location').value,
        model: this.sellForm.get('model').value,
        name: this.sellForm.get('fullName').value,
        telephone: this.sellForm.get('phone').value,
        year: this.sellForm.get('year').value
      }
    };

    this.http.post(`/api/leads/${this.leadId}/trade_in`, body)
      .subscribe(() => this.router.navigate(['/seguro', this.leadId]));
  }

}
