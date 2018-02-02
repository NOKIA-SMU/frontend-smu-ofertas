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
    { id: '0', name: 'id', db: 'id', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '1', name: 'solicitud id', db: 'solicitudId', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '2', name: 'supervisor', db: 'solicitudSupervisor', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '3', name: 'analista', db: 'solicitudAnalista', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '4', name: 'estacion', db: 'solicitudEstacionNombre', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '5', name: 'region', db: 'solicitudEstacionRegion', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '6', name: 'departamento', db: 'solicitudEstacionDepartamento', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '7', name: 'ciudad', db: 'solicitudEstacionCiudad', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '8', name: 'sid', db: 'suministroServicioId', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '9', name: 'nombre', db: 'suministroServicioNombre', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '10', name: 'descripcion', db: 'suministroServicioDescripcion', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '11', name: 'codigo lpu', db: 'suministroServicioCodigoLpu', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '12', name: 'descripcion lpu', db: 'suministroServicioDescripcionLpu', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '13', name: 'valor lpu', db: 'suministroServicioValorLpu', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '14', name: 'unidad', db: 'suministroServicioUnidad', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '15', name: 'cantidad', db: 'suministroServicioQty', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '16', name: 'comentario', db: 'suministroServicioComentario', own: false, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '17', name: 'tipo sitio', db: 'tipoSitio', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '18', name: 'tipo acceso', db: 'tipoAcceso', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '19', name: 'naturaleza servicio', db: 'naturalezaServicio', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '20', name: 'descripcion ods', db: 'descripcionOds', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '21', name: 'fecha recibido ods', db: 'fechaRecibidoOds', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '22', name: 'semana recibido ods', db: 'semanaRecibidoOds', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '23', name: 'tipo oferta', db: 'tipoOferta', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '24', name: 'work order', db: 'workOrder', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '25', name: 'descripcion tarea', db: 'descripcionTarea', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '26', name: 'encargado cliente', db: 'encargadoCliente', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '27', name: 'fecha ejecucion', db: 'fechaEjecucion', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '28', name: 'confirmacion recibido', db: 'confirmacionRecibido', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '29', name: 'comentario supervisor', db: 'comentarioSupervisor', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '30', name: 'numero oferta', db: 'numeroOferta', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '31', name: 'modalidad', db: 'modalidad', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '32', name: 'precio unidad proveedor', db: 'precioUnidadProveedor', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '33', name: 'precio total proveedor', db: 'precioTotalProveedor', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '34', name: 'precio unidad venta', db: 'precioUnidadVenta', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '35', name: 'precio total venta', db: 'precioTotalVenta', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '36', name: 'precio unidad cliente', db: 'precioUnidadCliente', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '37', name: 'precio total cliente', db: 'precioTotalCliente', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '38', name: 'margen', db: 'margen', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '39', name: 'tipo adquisicion', db: 'tipoAdquisicion', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '40', name: 'proveedor', db: 'proveedor', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '41', name: 'tas oferta anterior', db: 'tasOfertaAnterior', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '42', name: 'fecha despacho supervisor', db: 'fechaDespachoSupervisor', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '43', name: 'semana despacho supervisor', db: 'semanaDespachoSupervisor', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '44', name: 'fecha despacho compras', db: 'fechaDespachoCompras', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '45', name: 'semana despacho compras', db: 'semanaDespachoCompras', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '46', name: 'fecha respuesta compras', db: 'fechaRespuestaCompras', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '47', name: 'semana respuesta compras', db: 'semanaRespuestaCompras', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '48', name: 'fecha envio oferta cliente', db: 'fechaEnvioOfertaCliente', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '49', name: 'semana envio oferta cliente', db: 'semanaEnvioOfertaCliente', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '50', name: 'fecha envio oferta cliente negociada', db: 'fechaEnvioOfertaClienteNegociada', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '51', name: 'semana envio oferta cliente negociada', db: 'semanaEnvioOfertaClienteNegociada', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '52', name: 'fecha respuesta cliente', db: 'fechaRespuestaCliente', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '53', name: 'semana respuesta cliente', db: 'semanaRespuestaCliente', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '54', name: 'fecha respuesta cliente negociada', db: 'fechaRespuestaClienteNegociada', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '55', name: 'semana respuesta cliente negociada', db: 'semanaRespuestaClienteNegociada', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '56', name: 'tipo respuesta cliente', db: 'tipoRespuestaCliente', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '57', name: 'tipo respuesta cliente negociada', db: 'tipoRespuestaClienteNegociada', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '58', name: 'po', db: 'po', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '59', name: 'fecha po', db: 'fechaPo', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '60', name: 'valor po', db: 'valorPo', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '61', name: 'comentario analista', db: 'comentarioAnalista', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '62', name: 'subestado oferta', db: 'subestadoOferta', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '63', name: 'estado oferta', db: 'estadoOferta', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '64', name: 'fecha entrega almacen', db: 'fechaEntregaAlmacen', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '65', name: 'comentario almacenista', db: 'comentarioAlmacenista', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '66', name: 'comentario coordinador', db: 'comentarioCoordinador', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '67', name: 'tipo elemento', db: 'tipoElemento', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '68', name: 'valor conciliado cliente', db: 'valorConciliadoCliente', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '69', name: 'fecha conciliado cliente', db: 'fechaConciliadoCliente', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '70', name: 'comentario facturador', db: 'comentarioFacturador', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '71', name: 'fecha envio acta smu', db: 'fechaEnvioActaSmu', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '72', name: 'comentario acta', db: 'comentarioActa', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '73', name: 'fecha firma acta smu', db: 'fechaFirmaActaSmu', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
    { id: '74', name: 'fecha gr smu', db: 'fechaGrSmu', own: true, permissions: [{ name: 'leer', checked: false }, { name: 'editar', checked: false }] },
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
              debugger
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
