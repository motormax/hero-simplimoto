import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {fetchLead, LeadResponse, fetchAccessories, AccessoriesResponse} from '../../utils';
import {NAMES, URLS} from '../../hardcoded';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {
  lead$: Observable<LeadResponse>;
  accessories$: Observable<AccessoriesResponse>;
  leadId: string;
  photo: string;
  name: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.lead$ = fetchLead.call(this);
    this.accessories$ = fetchAccessories.call(this);

    this.lead$.subscribe(r => {
      if (!r) { return; }

      this.name = NAMES[r.data.motorcycle.id];
      this.photo = URLS[this.name];
    });

    // this.accessories$.subscribe(r => {
    //   if (!r) { return; }
    // });
  }

}
