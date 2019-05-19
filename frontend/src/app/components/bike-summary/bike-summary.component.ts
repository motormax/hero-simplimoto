import {Component, Input, OnInit} from '@angular/core';
import {accessoriesAmount, LeadResponse} from '../../utils';
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
  accessoriesSum: number;
  totalPrice: number;

  @Input()
  set lead(lead: LeadResponse) {
    this.name = NAMES[lead.data.motorcycle.id];
    this.photo = URLS[this.name];
    this.accessoriesSum = accessoriesAmount(lead);
    this.price = lead.data.motorcycle.price;
    this.totalPrice = this.price + this.accessoriesSum;
  }

  ngOnInit() {
  }

}
