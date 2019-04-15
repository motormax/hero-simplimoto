import { Component, OnInit } from '@angular/core';
import {fetchLead, LeadResponse} from '../../utils';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

interface Issuer {
  id: string;
  name: string;
  processing_mode: string;
  secure_thumbnail: string;
  thumbnail: string;
}

interface PaymentMethod {
  accreditation_time: number;
  additional_info_needed: string[];
  deferred_capture: string;
  financial_institutions: any[];
  id: string;
  max_allowed_amount: number;
  min_allowed_amount: number;
  name: string;
  payment_type_id: string;
  processing_modes: string[];
  secure_thumbnail: string;
  settings: any[];
  status: string;
  thumbnail: string;
}

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
  lead$: Observable<LeadResponse>;
  issuers: Issuer[];
  paymentMethods: PaymentMethod[];
  leadId: string;
  selectedId?: string;
  selectedIssuer?: Issuer;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.lead$ = fetchLead.call(this);
    this.initMercadopago();
  }

  onCardSelected(id: string) {
    this.selectedId = id;
    this.getIssuers(id);
  }

  onIssuerSelected(issuer: Issuer) {
    this.selectedIssuer = issuer;
  }

  private initMercadopago() {
    // @ts-ignore
    window.Mercadopago.setPublishableKey('TEST-5cf66383-f185-4848-a5d1-367710c38f62');
    // this.getIssuers();
    this.getCreditCards();
  }

  private getCreditCards() {
    // @ts-ignore
    window.Mercadopago.getAllPaymentMethods((code: number, response: PaymentMethod[]) => {
      console.log(response);
      this.paymentMethods = response.filter(pm => pm.payment_type_id === 'credit_card');
    });
  }

  private getIssuers(id) {
    // @ts-ignore
    window.Mercadopago.getIssuers(id, (code: number, response: Issuer[]) => {
      console.log(response);
      this.issuers = response;
    });
  }
}
