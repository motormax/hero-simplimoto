import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { CustomizeComponent } from './pages/customize/customize.component';
import { FinanceComponent } from './pages/finance/finance.component';
import { UsedComponent } from './pages/used/used.component';
import { InsuranceComponent } from './pages/insurance/insurance.component';
import { PatenteComponent } from './pages/patente/patente.component';
import { AccessoriesComponent } from './pages/accessories/accessories.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DiscoverComponent,
    CustomizeComponent,
    FinanceComponent,
    UsedComponent,
    InsuranceComponent,
    PatenteComponent,
    AccessoriesComponent,
    DeliveryComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
