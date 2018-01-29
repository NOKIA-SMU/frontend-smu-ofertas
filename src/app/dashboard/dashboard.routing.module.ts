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
import { SupplieOperateComponent } from "./supplies/supplie-operate.component";

import { OffersComponent } from './offers/offers.component';
import { OfferOperateComponent } from './offers/offer-operate.component';

import { ServicesComponent } from './services/services.component';
import { ServiceOperateComponent } from './services/service-operate.component';

import { ExportComponent } from './export/export.component';

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
					{ path: 'suministros/:id', component: SupplieOperateComponent },
					{ path: 'servicios', component: ServicesComponent },
					{ path: 'servicios/:id', component: ServiceOperateComponent },
					{ path: 'ofertas', component: OffersComponent },
					{ path: 'ofertas/:id', component: OfferOperateComponent },
					{ path: 'exportar', component: ExportComponent }
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

