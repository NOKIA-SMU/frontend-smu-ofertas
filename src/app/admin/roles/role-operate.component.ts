import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role, Permission, Profile } from '../../models/auth.models';
import { AdminService } from '../admin.service';
import { AuthService } from '../../auth/auth.service';
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
  actualColOfferRoles: string;
  permissions: Permission[];
  currentUser: Profile;

  role: Role;

  colsOffer = [
    { id: '0', name: 'id', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '1', name: 'solicitud id', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '2', name: 'supervisor', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '3', name: 'analista', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '4', name: 'estacion', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '5', name: 'region', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '6', name: 'departamento', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '7', name: 'ciudad', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '8', name: 'sid', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '9', name: 'nombre', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '10', name: 'descripcion', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '11', name: 'codigo lpu', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '12', name: 'descripcion lpu', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '13', name: 'valor lpu', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '14', name: 'unidad', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '15', name: 'cantidad', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '16', name: 'comentario', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '17', name: 'tipo sitio', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '18', name: 'tipo acceso', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '19', name: 'naturaleza servicio', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '20', name: 'descripcion ods', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '21', name: 'fecha recibido ods', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '22', name: 'semana recibido ods', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '23', name: 'tipo oferta', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '24', name: 'work order', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '25', name: 'descripcion tarea', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '26', name: 'encargado cliente', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '27', name: 'fecha ejecucion', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '28', name: 'confirmacion recibido', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '29', name: 'comentario supervisor', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '30', name: 'numero oferta', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '31', name: 'modalidad', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '32', name: 'precio unidad proveedor', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '33', name: 'precio total proveedor', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '34', name: 'precio unidad venta', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '35', name: 'precio total venta', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '36', name: 'precio unidad cliente', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '37', name: 'precio total cliente', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '38', name: 'margen', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '39', name: 'tipo adquisicion', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '40', name: 'proveedor', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '41', name: 'tas oferta anterior', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '42', name: 'fecha despacho supervisor', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '43', name: 'semana despacho supervisor', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '44', name: 'fecha despacho compras', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '45', name: 'semana despacho compras', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '46', name: 'fecha respuesta compras', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '47', name: 'semana respuesta compras', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '48', name: 'fecha envio oferta cliente', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '49', name: 'semana envio oferta cliente', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '50', name: 'fecha envio oferta cliente negociada', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '51', name: 'semana envio oferta cliente negociada', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '52', name: 'fecha respuesta cliente', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '53', name: 'semana respuesta cliente', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '54', name: 'fecha respuesta cliente negociada', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '55', name: 'semana respuesta cliente negociada', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '56', name: 'tipo respuesta cliente', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '57', name: 'tipo respuesta cliente negociada', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '58', name: 'po', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '59', name: 'fecha po', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '60', name: 'valor po', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '61', name: 'comentario analista', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '62', name: 'subestado oferta', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '63', name: 'estado oferta', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '64', name: 'fecha entrega almacen', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '65', name: 'comentario almacenista', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '66', name: 'comentario coordinador', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '67', name: 'tipo elemento', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '68', name: 'valor conciliado cliente', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '69', name: 'fecha conciliado cliente', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '70', name: 'comentario facturador', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '71', name: 'fecha envio acta smu', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '72', name: 'comentario acta', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '73', name: 'fecha firma acta smu', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '74', name: 'fecha gr smu', permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private authService: AuthService,
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
              for (let i = 0; i < res.list.length; i++) {
                for (let j = 0; j < this.permissions.length; j++) {
                  if (res.list[i].id == this.permissions[j].id) {
                    this.permissions[j].checked = true;
                  }
                }
              }
            })
          }, error => {
            this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Consulta permisos del rol', error);
          })
          // Get columns offer by rol
          this.adminService.getColsOfferRole(this.role)
            .subscribe(res => {
              res.map(res => {
                this.actualColOfferRoles = res.id;
                for (let i = 0; i < res.list.length; i++)
                  this.colsOffer[res.list[i].id].permissions = res.list[i].permissions;
              })
            }, error => {
              this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Consulta columnas de oferta para rol', error);
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
        this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Consulta de todos los permisos', error);
      });
  }

  ngOnInit() { }

  selectPermission(permission: Permission) {
    permission.checked = !permission.checked;
  }

  saveRole(permissions: Permission[]) {
    // build permissions selected
    let permissionsSelected = [];
    for (let i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].checked) {
        permissionsSelected.push(this.permissions[i])
      }
    }
    // build columns offer selected
    let colsSelected = [];
    for (let i = 0; i < this.colsOffer.length; i++) {
      for (let j = 0; j < this.colsOffer[i].permissions.length; j++) {
        if (this.colsOffer[i].permissions[j].checked) {
          colsSelected.push(this.colsOffer[i]);
          j = this.colsOffer[i].permissions.length;
        }
      }
    }
    if (permissions == undefined) permissions = [];
    // Create role
    if (this.isNew) {
      this.adminService.createRole(this.role)
        .then(res => {
          let roleId = res.id;
          // Asign permissions to role
          this.adminService.assignPermissionToRole(res.id, permissionsSelected)
            .then(res => {
              // Asign columns offer to role
              this.adminService.assignColsOfferToRole(roleId, colsSelected)
                .then(res => {
                  this.router.navigate(['/admin/roles']);
                }, error => {
                  this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Asignación de campos al role', error);
                })
            }, error => {
              this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Asignación de permisos al role', error);
            })
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Crear role');
        });
    }
    // Update role
    else {
      this.adminService.updateRole(this.role)
        .then(res => {
          // Update permissions to role
          this.adminService.updatePermissionsToRole(this.role.id, this.actualColPermissions, permissionsSelected)
          .then(res => {
              // Update columns offer to role
              this.adminService.updateColsOfferToRole(this.role.id, this.actualColOfferRoles, colsSelected)
                .then(res => {
                  this.router.navigate(['/admin/roles']);
                }, error => {
                  this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Asignación de campos al role', error);
                })
            }, error => {
              this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Actualizar permisos de role', error);
            });
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Actualizar nombre role', error);
        });
    }
  }
}
