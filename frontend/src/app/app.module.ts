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
import { HttpClientModule } from '@angular/common/http';
import { BikeSummaryComponent } from './components/bike-summary/bike-summary.component';
import { BikeDetailsComponent } from './components/bike-details/bike-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';

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
    CheckoutComponent,
    BikeSummaryComponent,
    BikeDetailsComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCoFEZ8yAxkd25I_CLcBWuU0w0MpWVavzk',
      libraries: ['places']
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
