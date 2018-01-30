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
    'id',
    'solicitudId',
    'solicitudSupervisor',
    'solicitudAnalista',
    'solicitudEstacionNombre',
    'solicitudEstacionRegion',
    'solicitudEstacionDepartamento',
    'solicitudEstacionCiudad',
    'suministroServicioId',
    'suministroServicioNombre',
    'suministroServicioDescripcion',
    'suministroServicioCodigoLpu',
    'suministroServicioDescripcionLpu',
    'suministroServicioValorLpu',
    'suministroServicioUnidad',
    'suministroServicioQty',
    'suministroServicioComentario',
    'tipoSitio',
    'tipoAcceso',
    'naturalezaServicio',
    'descripcionOds',
    'fechaRecibidoOds',
    'semanaRecibidoOds',
    'tipoOferta',
    'workOrder',
    'descripcionTarea',
    'encargadoCliente',
    'fechaEjecucion',
    'confirmacionRecibido',
    'comentarioSupervisor',
    'numeroOferta',
    'modalidad',
    'precioUnidadProveedor',
    'precioTotalProveedor',
    'precioUnidadVenta',
    'precioTotalVenta',
    'precioUnidadCliente',
    'precioTotalCliente',
    'margen',
    'tipoAdquisicion',
    'proveedor',
    'tasOfertaAnterior',
    'fechaDespachoSupervisor',
    'semanaDespachoSupervisor',
    'fechaDespachoCompras',
    'semanaDespachoCompras',
    'fechaRespuestaCompras',
    'semanaRespuestaCompras',
    'fechaEnvioOfertaCliente',
    'semanaEnvioOfertaCliente',
    'fechaEnvioOfertaClienteNegociada',
    'semanaEnvioOfertaClienteNegociada',
    'fechaRespuestaCliente',
    'semanaRespuestaCliente',
    'fechaRespuestaClienteNegociada',
    'semanaRespuestaClienteNegociada',
    'tipoRespuestaCliente',
    'tipoRespuestaClienteNegociada',
    'po',
    'fechaPo',
    'valorPo',
    'comentarioAnalista',
    'subestadoOferta',
    'estadoOferta',
    'fechaEntregaAlmacen',
    'comentarioAlmacenista',
    'comentarioCoordinador',
    'tipoElemento',
    'valorConciliadoCliente',
    'fechaConciliadoCliente',
    'comentarioFacturador',
    'fechaEnvioActaSmu',
    'comentarioActa',
    'fechaFirmaActaSmu',
    'fechaGrSmu',
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
              this.router.navigate(['/admin/roles']);
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
