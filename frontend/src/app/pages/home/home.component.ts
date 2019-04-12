import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URLS, IDS } from '../../hardcoded';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  keys = Object.keys(URLS);
  photos = URLS;
  ids = IDS;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  onCreateLead(motorcycleId: number) {
    this.http.post('/api/leads', { lead: { motorcycle_id: motorcycleId } })
      .subscribe(({ data: { id } }: any) => this.router.navigate(['/descubri', id]));
  }
}
