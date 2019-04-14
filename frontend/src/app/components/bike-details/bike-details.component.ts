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

  constructor() { }

  @Input()
  set lead(lead: LeadResponse) {
    this.data = lead;
    this.name = lead.data.motorcycle.name;
  }

  ngOnInit() {
  }

}
