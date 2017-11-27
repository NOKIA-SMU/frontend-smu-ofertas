import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

import { AdminRoutingModule } from './admin.routing.module';
import { AdminComponent } from './admin.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { AdminService } from './admin.service';
import { ProfilesComponent } from './profiles/profiles.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    MaterialModule
  ],
  declarations: [AdminComponent, PermissionsComponent, RolesComponent, ProfilesComponent],
  providers: [AdminService]
})

export class AdminModule { }
