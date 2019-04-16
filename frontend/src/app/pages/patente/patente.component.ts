import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {fetchLead, LeadResponse} from '../../utils';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-patente',
  templateUrl: './patente.component.html',
  styleUrls: ['./patente.component.css']
})
export class PatenteComponent implements OnInit {
  lead$: Observable<LeadResponse>;
  leadId: string;
  selectedOption = 'with_hero';

  set option(value) {
    console.log(value);
    this.selectedOption = value;
  }

  get option() {
    return this.selectedOption;
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
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
}
