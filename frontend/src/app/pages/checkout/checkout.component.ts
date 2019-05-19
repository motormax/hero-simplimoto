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
  paymentMethodId: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private formBuild: FormBuilder, private router: Router) { }

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
    this.initMercadopago();
  }

  private initMercadopago() {
    // @ts-ignore
    window.Mercadopago.setPublishableKey(process.env.REACT_APP_MERCADO_LIBRE_KEY);
  }

  submit() {
    if (this.form.invalid) {
      console.log('invalid');
      return;
    }

    if (!this.paymentMethodId) {
      console.log('No payment method id');
      return;
    }

    const email = this.form.get('email').value;
    const fullName = this.form.get('fullName').value;
    const phone = `${this.form.get('phone').value}`;
    const mercadoPagoBody = {
      fullName,
      phone,
      cardNumber: this.form.get('cardNumber').value,
      email,
      securityCode: this.form.get('cvv').value,
      cardExpirationMonth: this.form.get('month').value,
      cardExpirationYear: this.form.get('year').value,
      cardholderName: this.form.get('cardName').value,
      docType: this.form.get('idType').value,
      docNumber: this.form.get('idNumber').value,
      paymentMethodId: this.paymentMethodId,
    };
    // @ts-ignore
    window.Mercadopago.createToken(mercadoPagoBody, (status, response) => {
      if (status === 200 || status === 201) {
        const creditCardToken = response.id;
        console.log(`Token received: ${creditCardToken}`);
        this.http.post(
          `/api/leads/${this.leadId}/purcharse_order`,
          {
            credit_card_token: creditCardToken,
            email,
            full_name: fullName,
            phone,
          })
          .subscribe(
            () => {
              console.log('success');
              this.router.navigate(['/']);
            },
            () => console.log('errorr')
          );
      } else {
        // TODO: Handle sdk failure
      }
    });

    console.log('valid');
  }

  onCardNumberChanged() {
    console.log('AAAA');
    const value = this.form.get('cardNumber').value;
    console.log(value);
    if (value) {
      const asString = `${value}`;
      if (asString.length >= 6) {
        // @ts-ignore
        window.Mercadopago.getPaymentMethod(
          { bin: asString.slice(0, 6) },
          (status, response) => {
            console.log('payment method id received');
            console.log(response);
            if (status === 200) {
              console.log('success');
              this.paymentMethodId = response[0].id;
            }
          });
      }
    }
  }
}
