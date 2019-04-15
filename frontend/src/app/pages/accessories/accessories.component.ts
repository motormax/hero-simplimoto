import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {fetchLead, LeadResponse} from '../../utils';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {
  lead$: Observable<LeadResponse>;
  leadId: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.lead$ = fetchLead.call(this);
  }
}
