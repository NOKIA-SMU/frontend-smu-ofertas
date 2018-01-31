import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role, Permission } from '../../models/auth.models';
import { AdminService } from '../admin.service';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-role-operate',
  templateUrl: './role-operate.component.html',
  styleUrls: ['../admin.component.scss', './roles.component.scss']
})

export class RoleOperateComponent implements OnInit {

  data: any;
  isNew: boolean;

  actualColPermissions: string;
  rolePermissions: Permission[];
  permissions: Permission[];

  role: Role;

  colOffers = [
    { name: 'id', checked: false },
    { name: 'solicitud id', checked: false },
    { name: 'supervisor', checked: false },
    { name: 'analista', checked: false },
    { name: 'estacion', checked: false },
    { name: 'region', checked: false },
    { name: 'departamento', checked: false },
    { name: 'ciudad', checked: false },
    { name: 'sid', checked: false },
    { name: 'nombre', checked: false },
    { name: 'descripcion', checked: false },
    { name: 'codigo lpu', checked: false },
    { name: 'descripcion lpu', checked: false },
    { name: 'valor lpu', checked: false },
    { name: 'unidad', checked: false },
    { name: 'cantidad', checked: false },
    { name: 'comentario', checked: false },
    { name: 'tipo sitio', checked: false },
    { name: 'tipo acceso', checked: false },
    { name: 'naturaleza servicio', checked: false },
    { name: 'descripcion ods', checked: false },
    { name: 'fecha recibido ods', checked: false },
    { name: 'semana recibido ods', checked: false },
    { name: 'tipo oferta', checked: false },
    { name: 'work order', checked: false },
    { name: 'descripcion tarea', checked: false },
    { name: 'encargado cliente', checked: false },
    { name: 'fecha ejecucion', checked: false },
    { name: 'confirmacion recibido', checked: false },
    { name: 'comentario supervisor', checked: false },
    { name: 'numero oferta', checked: false },
    { name: 'modalidad', checked: false },
    { name: 'precio unidad proveedor', checked: false },
    { name: 'precio total proveedor', checked: false },
    { name: 'precio unidad venta', checked: false },
    { name: 'precio total venta', checked: false },
    { name: 'precio unidad cliente', checked: false },
    { name: 'precio total cliente', checked: false },
    { name: 'margen', checked: false },
    { name: 'tipo adquisicion', checked: false },
    { name: 'proveedor', checked: false },
    { name: 'tas oferta anterior', checked: false },
    { name: 'fecha despacho supervisor', checked: false },
    { name: 'semana despacho supervisor', checked: false },
    { name: 'fecha despacho compras', checked: false },
    { name: 'semana despacho compras', checked: false },
    { name: 'fecha respuesta compras', checked: false },
    { name: 'semana respuesta compras', checked: false },
    { name: 'fecha envio oferta cliente', checked: false },
    { name: 'semana envio oferta cliente', checked: false },
    { name: 'fecha envio oferta cliente negociada', checked: false },
    { name: 'semana envio oferta cliente negociada', checked: false },
    { name: 'fecha respuesta cliente', checked: false },
    { name: 'semana respuesta cliente', checked: false },
    { name: 'fecha respuesta cliente negociada', checked: false },
    { name: 'semana respuesta cliente negociada', checked: false },
    { name: 'tipo respuesta cliente', checked: false },
    { name: 'tipo respuesta cliente negociada', checked: false },
    { name: 'po', checked: false },
    { name: 'fecha po', checked: false },
    { name: 'valor po', checked: false },
    { name: 'comentario analista', checked: false },
    { name: 'subestado oferta', checked: false },
    { name: 'estado oferta', checked: false },
    { name: 'fecha entrega almacen', checked: false },
    { name: 'comentario almacenista', checked: false },
    { name: 'comentario coordinador', checked: false },
    { name: 'tipo elemento', checked: false },
    { name: 'valor conciliado cliente', checked: false },
    { name: 'fecha conciliado cliente', checked: false },
    { name: 'comentario facturador', checked: false },
    { name: 'fecha envio acta smu', checked: false },
    { name: 'comentario acta', checked: false },
    { name: 'fecha firma acta smu', checked: false },
    { name: 'fecha gr smu', checked: false },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private appService: AppService
  ) {
    this.data = this.route.snapshot.queryParams;
    // Get permisisons all
    this.adminService.getPermissions()
      .subscribe(permissions => {
        this.permissions = permissions;

        // Update role
        if (this.route.snapshot.params.id != 'crear') {
          this.isNew = false;
          this.role = {
            id: this.data.id,
            name: this.data.name
          }

          // Get permissions from role
          this.adminService.getRolePermissions(this.role).subscribe(res => {
            res.map(res => {
              this.actualColPermissions = res.id;
              this.rolePermissions = res.list;
              for (let i = 0; i < this.rolePermissions.length; i++) {
                for (let j = 0; j < this.permissions.length; j++) {
                  if (this.rolePermissions[i].id == this.permissions[j].id) {
                    this.permissions[j].checked = true;
                  }
                }
              }
            })
          }, error => {
            this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Consulta permisos del rol');
          })

        }
        // Create role
        if (this.route.snapshot.params.id == 'crear') {
          this.isNew = true;
          this.role = {
            name: ''
          }
        }
    }, error => {
      this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Consulta de todos los permisos');
    });
  }

  ngOnInit() { }

  selectPermission(permission: Permission) {
    permission.checked = !permission.checked;
  }

  saveRole(permissions: Permission[]) {
    if (permissions == undefined) permissions = [];
    if (this.isNew) {
      this.adminService.createRole(this.role)
        .then(res => {
          let permissions = [];
          for (let i = 0; i < this.permissions.length; i++) {
            if (this.permissions[i].checked) {
              permissions.push(this.permissions[i])
            }
          }
          this.adminService.assignPermissionToRole(res.id, permissions)
            .then(res => {
              this.router.navigate(['/admin/roles']);
            }, error => {
              this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Asignación de permisos al role');
            })
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Crear role');
        });
    } else {
      this.adminService.updateRole(this.role)
        .then(res => {
          let permissions = [];
          for (let i = 0; i < this.permissions.length; i++) {
            if (this.permissions[i].checked) {
              permissions.push(this.permissions[i])
            }
          }
          this.adminService.updatePermissionsToRole(this.role.id, this.actualColPermissions, permissions)
            .then(res => {


              this.adminService.updatePermissionsToRole(this.role.id, this.actualColPermissions, permissions)
                .then(res => {
                  this.router.navigate(['/admin/roles']);

                }, error => {
                  this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Actualizar permisos de role', error);
                });


            }, error => {
              this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Actualizar permisos de role', error);
            });
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Actualizar nombre role', error);
        });
    }
  }

  // Permissions filed offers
  selectOfferField(field) {
    debugger
  }

}
