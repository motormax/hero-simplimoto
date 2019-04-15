import { Component, OnInit } from '@angular/core';
import {fetchLead, LeadResponse} from '../../utils';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
  lead$: Observable<LeadResponse>;
  leadId: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.lead$ = fetchLead.call(this);
    // @ts-ignore
    window.Mercadopago.setPublishableKey('TEST-98638d24-eb00-4dd5-82d8-4e573fac6a80');
    // @ts-ignore
    window.Mercadopago.getIssuers('visa', r => console.log(r));

  }

}
