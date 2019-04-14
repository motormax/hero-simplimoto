import {switchMap} from 'rxjs/operators';
import {merge, Observable, of} from 'rxjs';

export interface LeadResponse {
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

export function fetchLead() {
  return this.route.paramMap.pipe(
    switchMap((params) => {
      // @ts-ignore
      this.leadId = params.get('leadId');
      return merge(
        of(null),
        this.http.get(`/api/leads/${this.leadId}`)
      );
    })
  ) as Observable<LeadResponse>;
}

interface Accessory {
  price: string;
  name: string;
  logo_url: string;
  id: number;
  description: string;
}

export interface AccessoriesResponse {
  data: Accessory[];
}

export function fetchAccessories() {
  return this.http.get(`/api/accessories`) as Observable<AccessoriesResponse>;
}
