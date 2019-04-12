import { Component, OnInit } from '@angular/core';
import {merge, Observable, of} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {URLS, NAMES} from '../../hardcoded';

interface Response {
  data: {
    id: string;
    last_login: string;
    motorcycle: {
      id: number;
      name: string;
      price: number;
    }
  };
}

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  lead$: Observable<Response>;
  leadId: string;
  photo: string;
  name: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.lead$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.leadId = params.get('leadId');
        return merge(
          of(null),
          this.http.get(`/api/leads/${this.leadId}`)
        );
      })
    ) as Observable<Response>;

    this.lead$.subscribe(r => {
      if (!r) { return; }

      console.log(r.data.motorcycle);
      console.log(r);
      this.name = NAMES[r.data.motorcycle.id];
      this.photo = URLS[this.name];
      console.log(this.name);
    });
  }

}
