import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Permission } from '../../models/auth.models';
import { AppService } from "../../app.service";
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: "app-permissions",
  templateUrl: "./permissions.component.html",
  styleUrls: ['../admin.component.scss']
})

export class PermissionsComponent implements OnInit {

  permission: any = {};
  listPermissions: Permission[];
  isShowFormUpdatePermission: boolean = false;
  permissionToEdit: Permission;
  crud: string[] = ['crear', 'leer', 'editar', 'eliminar', 'exportar'];
  selectedTab = 0;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.adminService.getPermissions().subscribe(permissions => {
      this.listPermissions = permissions;
    }, error => {

    });
  }

  toggleFormUpdatePermission(event, permission: Permission) {
    this.isShowFormUpdatePermission = !this.isShowFormUpdatePermission;
    this.permissionToEdit = permission;
  }

  changeTab(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTab = tabChangeEvent.index;
  }

  createPermission(permission: Permission) {
    this.adminService.createPermission(permission)
      .then(res => {
        this.permission = {};
        this.selectedTab += 1;
        if (this.selectedTab >= 2) this.selectedTab = 0;
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Vuelva a intentarlo')
      });
  }

  deletePermission(permission: Permission) {
    this.adminService.deletePermission(permission)
      .then(res => {
        this.appService.showSwal('success-message', 'success', 'Operación Exitosa', 'Permiso eliminado')
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Vuelva a intentarlo')
      });
  }

  updatePermission(permission: Permission) {
    this.adminService.updatePermission(permission)
      .then(res => {
        this.isShowFormUpdatePermission = !this.isShowFormUpdatePermission;
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Vuelva a intentarlo')
      });
  }
}
