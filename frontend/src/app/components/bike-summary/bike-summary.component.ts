import {Component, Input, OnInit} from '@angular/core';
import {LeadResponse} from '../../utils';
import {NAMES, URLS} from '../../hardcoded';

@Component({
  selector: 'app-bike-summary',
  templateUrl: './bike-summary.component.html',
  styleUrls: ['./bike-summary.component.css']
})
export class BikeSummaryComponent implements OnInit {
  name: string;
  photo: string;
  price: number;

  @Input()
  set lead(lead: LeadResponse) {
    this.name = NAMES[lead.data.motorcycle.id];
    this.photo = URLS[this.name];
    this.price = lead.data.motorcycle.price;
  }

  ngOnInit() {
  }

}
