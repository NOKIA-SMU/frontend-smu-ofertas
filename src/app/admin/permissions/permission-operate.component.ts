import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role, Permission, Profile } from '../../models/auth.models';
import { AdminService } from '../admin.service';
import { AuthService } from '../../auth/auth.service';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-permission-operate',
  templateUrl: './permission-operate.component.html',
  styleUrls: ['./permission-operate.component.scss']
})

export class PermissionOperateComponent implements OnInit {

  data: any;
  isNew: boolean;

  permission: Permission;
  crud: string[] = ['crear', 'leer', 'editar', 'eliminar', 'exportar'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private authService: AuthService,
    private appService: AppService
  ) {
    this.data = this.route.snapshot.queryParams;

    // Update permission
    if (this.route.snapshot.params.id != 'crear') {
      this.isNew = false;
      this.permission = {
        id: this.data.id,
        name: this.data.name,
        model: this.data.model
      }
    }
    // Create permission
    if (this.route.snapshot.params.id == 'crear') {
      this.isNew = true;
      this.permission = {
        name: '',
        model: ''
      }

    }
  }

  ngOnInit() { }

  savePermission(permission: Permission) {
    debugger
    // Create permission
    if (this.isNew) {
      this.adminService.createPermission(permission)
        .then(res => {
          this.router.navigate([`admin/permisos`]);
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Crear permiso', error);
        })


    }
    // Update permission
    else {
      this.adminService.updatePermission(permission)
        .then(res => {
          this.router.navigate([`admin/permisos`]);
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Actualizar permiso', error);
        })
    }
  }

}
