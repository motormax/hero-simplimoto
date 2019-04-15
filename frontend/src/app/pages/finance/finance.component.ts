import { Component, OnInit } from '@angular/core';
import {fetchLead, LeadResponse} from '../../utils';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
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

interface Installments {
  discount_rate: number;
  installment_amount: number;
  installment_rate: number;
  installment_rate_collector: string[];
  installments: number;
  labels: string[];
  max_allowed_amount: number;
  min_allowed_amount: number;
  recommended_message: string;
  total_amount: number;
}

interface InstallmentsResponse {
  issuer: Issuer;
  merchant_account_id: any;
  payer_costs: Installments[];
  payment_method_id: string;
  payment_type_id: string;
  processing_mode: string;
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
  selectedPaymentMethod?: PaymentMethod;
  selectedIssuer?: Issuer;
  selectedInstallments?: Installments;
  price?: number;
  installments: Installments[];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.lead$ = fetchLead.call(this);
    this.lead$.subscribe(r => {
      if (!r) { return; }

      this.price = r.data.motorcycle.price;
    });
    this.initMercadopago();
  }

  onCardSelected(paymentMethod: PaymentMethod) {
    this.selectedPaymentMethod = paymentMethod;
    this.getIssuers(paymentMethod.id);
  }

  onIssuerSelected(issuer: Issuer) {
    this.selectedIssuer = issuer;
    this.getInstallments();
  }

  onInstallmentsSelected(installments: Installments) {
    this.selectedInstallments = installments;
  }

  onConfirm() {
    console.log(this.selectedInstallments);
    console.log(this.selectedPaymentMethod);
    console.log(this.selectedIssuer);
    const body = {
      financing_data: {
        cash_amount: 0,
        costs: this.selectedInstallments.labels[0], // Dudoso
        installments: this.selectedInstallments.installments,
        issuer_id: this.selectedIssuer.id,
        issuer_logo: this.selectedIssuer.secure_thumbnail,
        issuer_name: this.selectedIssuer.name,
        message: this.selectedInstallments.recommended_message,
        monthly_amount: this.selectedInstallments.installment_amount,
        payment_method_id: this.selectedPaymentMethod.id,
        payment_method_logo: this.selectedPaymentMethod.secure_thumbnail,
        payment_method_name: this.selectedPaymentMethod.name,
        provider: 'MERCADOPAGO'
      }
    };
    this.http.post(`/api/leads/${this.leadId}/financing_data`, body)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/vende', this.leadId]);
      });
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
      this.paymentMethods = response.filter(pm => pm.payment_type_id === 'credit_card');
    });
  }

  private getIssuers(id) {
    // @ts-ignore
    window.Mercadopago.getIssuers(id, (code: number, response: Issuer[]) => {
      this.issuers = response;
    });
  }

  private getInstallments() {
    const params = {
      issuer_id: this.selectedIssuer.id,
      payment_method_id: this.selectedPaymentMethod.id,
      amount: this.price
    };
    // @ts-ignore
    window.Mercadopago.getInstallments(params, (code: number, response: InstallmentsResponse[]) => {
      this.installments = response[0].payer_costs;
    });
  }
}
