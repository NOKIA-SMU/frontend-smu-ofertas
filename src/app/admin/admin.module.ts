import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Route } from '@angular/router';
import { MaterialModule } from '../material.module';

import { AdminRoutingModule } from './admin.routing.module';
import { AdminComponent } from './admin.component';
import { RolesComponent } from './roles/roles.component';
import { RoleOperateComponent } from './roles/role-operate.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionOperateComponent } from './permissions/permission-operate.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ProfileOperateComponent } from './profiles/profile-operate.component';
import { AdminService } from './admin.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    MaterialModule
  ],
  declarations: [AdminComponent, PermissionsComponent, PermissionOperateComponent, RolesComponent, RoleOperateComponent, ProfilesComponent, ProfileOperateComponent],
  providers: [AdminService]
})

export class AdminModule { }
