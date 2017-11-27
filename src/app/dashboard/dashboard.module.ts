import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// Material
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard.component';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxDatatableModule,
    MaterialModule
  ],
  declarations: [DashboardComponent, DataTableComponent]
})
export class DashboardModule { }
