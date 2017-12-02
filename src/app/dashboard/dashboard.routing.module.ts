import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { StationsComponent } from "./stations/stations.component";
import { StationUpdateComponent } from "./stations/station-update/station-update.component";
import { StationCreateComponent } from "./stations/station-create/station-create.component";

import { SubsystemsComponent } from './subsystems/subsystems.component';
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
					{ path: 'estaciones', component: StationsComponent },
					{ path: 'estaciones/:id', component: StationUpdateComponent },
					{ path: 'estaciones/crear', component: StationCreateComponent },
					{ path: 'subsistemas', component: SubsystemsComponent },
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

