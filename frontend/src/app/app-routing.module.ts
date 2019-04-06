import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DiscoverComponent} from './discover/discover.component';
import {CustomizeComponent} from './customize/customize.component';
import {FinanceComponent} from './finance/finance.component';
import {UsedComponent} from './used/used.component';
import {InsuranceComponent} from './insurance/insurance.component';
import {PatenteComponent} from './patente/patente.component';
import {AccessoriesComponent} from './accessories/accessories.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'descubri',
    component: DiscoverComponent
  },
  {
    path: 'personaliza',
    component: CustomizeComponent
  },
  {
    path: 'financia',
    component: FinanceComponent
  },
  {
    path: 'vende',
    component: UsedComponent
  },
  {
    path: 'seguro',
    component: InsuranceComponent
  },
  {
    path: 'accesorios',
    component: AccessoriesComponent
  },
  {
    path: 'patente',
    component: PatenteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
