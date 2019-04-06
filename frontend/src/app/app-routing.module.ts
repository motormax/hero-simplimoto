import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DiscoverComponent} from "./discover/discover.component";
import {CustomizeComponent} from "./customize/customize.component";
import {FinanceComponent} from "./finance/finance.component";
import {UsedComponent} from "./used/used.component";
import {InsuranceComponent} from "./insurance/insurance.component";
import {PatenteComponent} from "./patente/patente.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Holis'
    }
  },
  {
    path: 'descubri',
    component: DiscoverComponent,
    data: {
      title: 'Holis'
    }
  },
  {
    path: 'personaliza',
    component: CustomizeComponent,
    data: {
      title: 'Holis'
    }
  },
  {
    path: 'financia',
    component: FinanceComponent,
    data: {
      title: 'Holis'
    }
  },
  {
    path: 'vende',
    component: UsedComponent,
    data: {
      title: 'Holis'
    }
  },
  {
    path: 'seguro',
    component: InsuranceComponent,
    data: {
      title: 'Holis'
    }
  },
  {
    path: 'patente',
    component: PatenteComponent,
    data: {
      title: 'Holis'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
