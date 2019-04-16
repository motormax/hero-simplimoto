import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {fetchLead, LeadResponse} from '../../utils';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {
  lead$: Observable<LeadResponse>;
  leadId: string;
  motorcycleId: number;
  selectedOption = 'with_hero';

  set option(value) {
    console.log(value);
    this.selectedOption = value;
  }

  get option(): string {
    return this.selectedOption;
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.lead$ = fetchLead.call(this);
    this.lead$.subscribe(r => {
      if (!r) { return; }

      this.motorcycleId = r.data.motorcycle.id;
    });
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
