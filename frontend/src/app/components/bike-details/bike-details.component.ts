import {Component, Input, OnInit} from '@angular/core';
import {LeadResponse} from '../../utils';

@Component({
  selector: 'app-bike-details',
  templateUrl: './bike-details.component.html',
  styleUrls: ['./bike-details.component.css']
})
export class BikeDetailsComponent implements OnInit {
  data: LeadResponse;
  name: string;
  accessoriesSum: number;

  constructor() { }

  @Input()
  set lead(lead: LeadResponse) {
    console.log(lead);
    this.data = lead;
    this.name = lead.data.motorcycle.name;
  }

  ngOnInit() {
  }

}
