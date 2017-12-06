import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard.routing.module'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// Material
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';

import { StationsComponent } from './stations/stations.component';
import { StationOperateComponent } from './stations/station-operate.component';
import { StationsService } from './stations/stations.service';

import { SubsystemsComponent } from './subsystems/subsystems.component';
import { SubsystemOperateComponent } from './subsystems/subsystem-operate.component';
import { SubsystemsService } from './subsystems/subsystems.service';

import { RequestsComponent } from './requests/requests.component';
import { RequestOperateComponent } from './requests/request-operate.component';
import { RequestsService } from './requests/requests.service';

import { SuppliesComponent } from './supplies/supplies.component';
import { ServicesComponent } from './services/services.component';

import { OffersComponent } from './offers/offers.component';
import { OfferOperateComponent } from './offers/offer-operate.component';
import { OffersService } from './offers/offers.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    NgxDatatableModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
    StationsComponent,
    StationOperateComponent,
    SubsystemsComponent,
    SubsystemOperateComponent,
    RequestsComponent,
    RequestOperateComponent,
    SuppliesComponent,
    ServicesComponent,
    OffersComponent,
    OfferOperateComponent],
  providers: [
    DashboardService,
    StationsService,
    SubsystemsService,
    RequestsService,
    OffersService
  ]
})

export class DashboardModule { }
