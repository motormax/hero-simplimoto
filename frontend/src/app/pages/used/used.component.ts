import { Component, OnInit } from '@angular/core';
import {fetchLead, LeadResponse} from '../../utils';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-used',
  templateUrl: './used.component.html',
  styleUrls: ['./used.component.css']
})
export class UsedComponent implements OnInit {
  lead$: Observable<LeadResponse>;
  leadId: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.lead$ = fetchLead.call(this);
  }

}
