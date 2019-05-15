import { Component, OnInit } from '@angular/core';
import {fetchLead, LeadResponse} from '../../utils';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  lead$: Observable<LeadResponse>;
  leadId: string;
  form: FormGroup;

  constructor(private http: HttpClient, private route: ActivatedRoute, private formBuild: FormBuilder) { }

  ngOnInit() {
    this.lead$ = fetchLead.call(this);
    this.form = this.formBuild.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvv: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      cardName: ['', Validators.required],
      idType: ['', Validators.required],
      idNumber: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) {
      console.log('invalid');
      return;
    }
    console.log('valid');
  }
}
