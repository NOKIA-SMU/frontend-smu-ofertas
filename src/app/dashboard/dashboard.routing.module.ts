import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DataTableComponent } from './data-table/data-table.component';

const dashboardRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{
				path: '',
				children: [
					{ path: 'table', component: DataTableComponent }
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

