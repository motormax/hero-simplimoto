import {flatMap, map, switchMap} from 'rxjs/operators';
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
    accessories: Accessory[];
  };
}

export function accessoriesAmount(lead: LeadResponse): number {
  return (lead.data.accessories || []).reduce((a, e) => parseInt(e.price, 10) + a, 0);
}

export function totalAmount(lead: LeadResponse): number {
  return lead.data.motorcycle.price + accessoriesAmount(lead);
}

export interface LeadAccessoriesResponse {
  data: Accessory[];
}

export function fetchLead() {
  return this.route.paramMap.pipe(
    switchMap((params) => {
      // @ts-ignore
      this.leadId = params.get('leadId');
      return merge(
        of(null),
        this.http.get(`/api/leads/${this.leadId}`).pipe(
          flatMap((lr: LeadResponse) =>
            this.http.get(`/api/leads/${this.leadId}/accessories`).pipe(
              map((ar: LeadAccessoriesResponse) =>
                ({ data: { ...(lr.data), accessories: ar.data } })
              )
            )
          )
        )
      );
    })
  ) as Observable<LeadResponse>;
}

export interface Accessory {
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
