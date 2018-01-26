import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ProfileOperateComponent } from './profiles/profile-operate.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from "./permissions/permissions.component";

const adminRoutes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: '',
				children: [
					{ path: 'perfiles', component: ProfilesComponent },
					{ path: 'perfiles/:id', component: ProfileOperateComponent },
					{ path: 'roles', component: RolesComponent },
					{ path: 'permisos', component: PermissionsComponent },
				]
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(adminRoutes)
	],
	exports: [
		RouterModule
	]
})

export class AdminRoutingModule { }
