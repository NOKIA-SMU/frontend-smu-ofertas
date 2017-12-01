import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// Material
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { StationsComponent } from './stations/stations.component';
import { StationsDetailComponent } from './stations/stations-detail/stations-detail.component';
import { SubsystemsComponent } from './subsystems/subsystems.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { ServicesComponent } from './services/services.component';
import { OffersComponent } from './offers/offers.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxDatatableModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
    StationsComponent,
    SubsystemsComponent,
    SuppliesComponent,
    ServicesComponent,
    OffersComponent,
    StationsDetailComponent],
  providers: [DashboardService]
})

export class DashboardModule { }
