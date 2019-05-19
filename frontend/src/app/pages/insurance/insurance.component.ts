import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {fetchLead, LeadResponse} from '../../utils';
import {Observable} from 'rxjs';
import {INFOMOTO, ISSUER_URLS} from '../../hardcoded';

const optionsFromIssuers = (issuers) => {
  const map = new Map();

  issuers.forEach((issuer) => {
    issuer.cotizaciones.forEach((cot) => {
      map.set(cot.cobertura_id, {
        id: cot.cobertura_id,
        title: cot.cobertura,
      });
    });
  });

  return Array.from(map.values());
};

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {
  lead$: Observable<LeadResponse>;
  leadId: string;
  motorcycleId: number;
  infomotoId: number;
  selectedOption = 'with_hero';
  postalCode?: string;
  age?: string;
  fetched = false;
  loading = false;
  issuers?: any[];
  options?: any[];
  selected?: [any, any];

  set option(value) {
    console.log(value);
    this.selectedOption = value;
  }

  get option(): string {
    return this.selectedOption;
  }

  get submitDisabled(): boolean {
    return !this.age || !this.postalCode;
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.lead$ = fetchLead.call(this);
    this.lead$.subscribe(r => {
      if (!r) { return; }

      this.infomotoId = INFOMOTO[r.data.motorcycle.id];
      this.motorcycleId = r.data.motorcycle.id;
    });
  }

  fetchInsuranceOptions() {
    if (!this.age || !this.postalCode) {
      return;
    }

    this.fetched = true;
    this.loading = true;

    this.http.get(
      // tslint:disable-next-line:max-line-length
      `/api/leads/${this.leadId}/insurance_quotes_v2?query_postal_code=${this.postalCode}&motorcycle_id=${this.infomotoId}&query_age=${this.age}`
    ).subscribe((r: any) => {
      console.log(r.data);
      this.issuers = Object.keys(r.data)
        .filter(insuranceName => r.data[insuranceName].status === 200)
        .map(insuranceName => ({ ...r.data[insuranceName], name: insuranceName, image: ISSUER_URLS[insuranceName] }));
      console.log(this.issuers);
      this.options = optionsFromIssuers(this.issuers);
      this.loading = false;
    });
  }

  issuerOptions(issuer) {
    return this.options.map(opt => {
      const included = issuer.cotizaciones.find(a => a.cobertura_id === opt.id);

      return {
        selected: JSON.stringify(this.selected) === JSON.stringify([issuer, included]),
        content: included ? `$${included.premio}` : 'X',
        option: included
      };
    });
  }

  onOptionSelected(issuer, option) {
    if (!option) {
      return;
    }

    this.selected = [issuer, option];
  }

  continueWithInsurance() {
    const option = this.selected[1];
    const issuer = this.selected[0];

    const body = {
      insurance_choice: {
        opt_in_or_out: 'heroInsurance',
        motorcycle_id: this.motorcycleId,
        insurance_broker_id: 1,
        insurance_policy_id: 1,
        quote_price: parseFloat(option.premio.replace(',', '.')),
        quote_broker_name: issuer.name,
        quote_broker_logo_url: issuer.image,
        quote_policy: option.cobertura,
        quote_more_info: option.cobertura,
        query_postal_code: `${this.postalCode}`,
        query_age: this.age,
        query_province: 'Capital Federal'
      }
    };

    this.http.post(`/api/leads/${this.leadId}/insurance`, body)
      .subscribe(() => this.router.navigate(['/accesorios', this.leadId]));
  }

  continueWithoutInsurance() {
    const body = {
      insurance_choice: {
        opt_in_or_out: 'personalInsurance',
        motorcycle_id: this.motorcycleId
      }
    };

    this.http.post(`/api/leads/${this.leadId}/insurance`, body)
      .subscribe(() => this.router.navigate(['/accesorios', this.leadId]));
  }
}
