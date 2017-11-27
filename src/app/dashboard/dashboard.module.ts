import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module'
// Material
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
