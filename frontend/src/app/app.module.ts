import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { CustomizeComponent } from './customize/customize.component';
import { FinanceComponent } from './finance/finance.component';
import { UsedComponent } from './used/used.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { PatenteComponent } from './patente/patente.component';
import { AccessoriesComponent } from './accessories/accessories.component';

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
    AccessoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
