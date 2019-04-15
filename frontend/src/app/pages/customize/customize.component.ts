import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {fetchLead, LeadResponse, fetchAccessories, AccessoriesResponse, Accessory} from '../../utils';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {
  lead$: Observable<LeadResponse>;
  accessories$: Observable<AccessoriesResponse>;
  leadId: string;
  selectedAccessories: Accessory[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.lead$ = fetchLead.call(this);
    this.accessories$ = fetchAccessories.call(this);
  }

  onAccessorySelected(accessory: Accessory) {
    if (this.selectedAccessories.includes(accessory)) {
      this.selectedAccessories = this.selectedAccessories.filter(a => a !== accessory);
      this.http.delete(`/api/leads/${this.leadId}/accessory/${accessory.id}`)
        .subscribe(() => console.log(`Accessory ${accessory.id} deleted`));
    } else {
      this.selectedAccessories = [...this.selectedAccessories, accessory];
      this.http.post(`/api/leads/${this.leadId}/accessory/${accessory.id}`, {})
        .subscribe(() => console.log(`Accessory ${accessory.id} added`));
    }
    console.log(this.selectedAccessories);
  }
}
