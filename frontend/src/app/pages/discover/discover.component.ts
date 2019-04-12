import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  lead$: Observable<any>;
  leadId: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.lead$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.leadId = params.get('leadId');
        return this.http.get(`/api/leads/${this.leadId}`);
      })
    );

    this.lead$.subscribe(response => console.log(response));
  }

}
