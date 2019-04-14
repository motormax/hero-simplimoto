import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NAMES, URLS} from '../../hardcoded';
import {fetchLead, LeadResponse} from '../../utils';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  lead$: Observable<LeadResponse>;
  leadId: string;
  photo: string;
  name: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.lead$ = fetchLead.call(this);

    this.lead$.subscribe(r => {
      if (!r) { return; }

      this.name = NAMES[r.data.motorcycle.id];
      this.photo = URLS[this.name];
    });
  }

}
