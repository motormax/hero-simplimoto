import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {DiscoverComponent} from './pages/discover/discover.component';
import {CustomizeComponent} from './pages/customize/customize.component';
import {FinanceComponent} from './pages/finance/finance.component';
import {UsedComponent} from './pages/used/used.component';
import {InsuranceComponent} from './pages/insurance/insurance.component';
import {PatenteComponent} from './pages/patente/patente.component';
import {AccessoriesComponent} from './pages/accessories/accessories.component';
import {DeliveryComponent} from './pages/delivery/delivery.component';
import {CheckoutComponent} from './pages/checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'descubri/:leadId',
    component: DiscoverComponent
  },
  {
    path: 'personaliza/:leadId',
    component: CustomizeComponent
  },
  {
    path: 'financia/:leadId',
    component: FinanceComponent
  },
  {
    path: 'vende/:leadId',
    component: UsedComponent
  },
  {
    path: 'seguro/:leadId',
    component: InsuranceComponent
  },
  {
    path: 'accesorios/:leadId',
    component: AccessoriesComponent
  },
  {
    path: 'patente/:leadId',
    component: PatenteComponent
  },
  {
    path: 'envio/:leadId',
    component: DeliveryComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
