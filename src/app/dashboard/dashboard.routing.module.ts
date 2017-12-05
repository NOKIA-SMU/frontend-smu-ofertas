import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { StationsComponent } from "./stations/stations.component";
import { StationOperateComponent } from "./stations/station-operate.component";

import { SubsystemsComponent } from './subsystems/subsystems.component';
import { SubsystemOperateComponent } from "./subsystems/subsystem-operate.component";

import { RequestsComponent } from './requests/requests.component';
import { RequestOperateComponent } from './requests/request-operate.component';

import { SuppliesComponent } from './supplies/supplies.component';
import { ServicesComponent } from './services/services.component';
import { OffersComponent } from './offers/offers.component';

const dashboardRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{
				path: '',
				children: [
					{ path: 'estaciones', component: StationsComponent},
					{ path: 'estaciones/:id', component: StationOperateComponent },
					{ path: 'subsistemas', component: SubsystemsComponent },
					{ path: 'subsistemas/:id', component: SubsystemOperateComponent },
					{ path: 'solicitudes', component: RequestsComponent},
					{ path: 'solicitudes/:id', component: RequestOperateComponent},
					{ path: 'suministros', component: SuppliesComponent },
					{ path: 'servicios', component: ServicesComponent },
					{ path: 'ofertas', component: OffersComponent }
				]
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(dashboardRoutes)
	],
	exports: [
		RouterModule
	]
})

export class DashboardRoutingModule { }

