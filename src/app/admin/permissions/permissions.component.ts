import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Permission } from '../../models/auth.models';
import { AppService } from "../../app.service";

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

  constructor(private adminService: AdminService, private appService: AppService) { }

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

  createPermission(permission: Permission) {
    this.adminService.createPermission(permission)
      .then(res => {
        this.appService.showSwal('success-message', 'success', 'Operación Exitosa', 'Permiso creado')
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
        this.appService.showSwal('success-message', 'success', 'Operación Exitosa', 'Permiso actualizado')
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Vuelva a intentarlo')
      });
  }
}
