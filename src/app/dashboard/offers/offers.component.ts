import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { OffersService } from "./offers.service";
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../../admin/admin.service';
import { AppService } from "../../app.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['../dashboard.component.scss', 'offers.component.scss']
})

export class OffersComponent implements OnInit, AfterViewInit {

  offersColumnsDynamics: any = [];
  offersAllColumns: any = [];

  // Initialize table offers
  dataSourceOffers = new MatTableDataSource();
  isLoadingResultsOffers = true;
  currentRowSelect: any;
  currentRowSelectData: any = {};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  currentUser: any;

  permissionsView: any = { };

  permissionsFields = {
    id: {leer: null, editar: null},
    solicitudId: {leer: null, editar: null},
    solicitudSupervisor: {leer: null, editar: null},
    solicitudAnalista: {leer: null, editar: null},
    solicitudEstacionNombre: {leer: null, editar: null},
    solicitudEstacionRegion: {leer: null, editar: null},
    solicitudEstacionDepartamento: {leer: null, editar: null},
    solicitudEstacionCiudad: {leer: null, editar: null},
    suministroServicioId: {leer: null, editar: null},
    suministroServicioNombre: {leer: null, editar: null},
    suministroServicioDescripcion: {leer: null, editar: null},
    suministroServicioCodigoLpu: {leer: null, editar: null},
    suministroServicioDescripcionLpu: {leer: null, editar: null},
    suministroServicioValorLpu: {leer: null, editar: null},
    suministroServicioUnidad: {leer: null, editar: null},
    suministroServicioQty: {leer: null, editar: null},
    suministroServicioComentario: {leer: null, editar: null},
    tipoSitio: {leer: null, editar: null},
    tipoAcceso: {leer: null, editar: null},
    naturalezaServicio: {leer: null, editar: null},
    descripcionOds: {leer: null, editar: null},
    fechaRecibidoOds: {leer: null, editar: null},
    semanaRecibidoOds: {leer: null, editar: null},
    tipoOferta: {leer: null, editar: null},
    workOrder: {leer: null, editar: null},
    descripcionTarea: {leer: null, editar: null},
    encargadoCliente: {leer: null, editar: null},
    fechaEjecucion: {leer: null, editar: null},
    confirmacionRecibido: {leer: null, editar: null},
    comentarioSupervisor: {leer: null, editar: null},
    numeroOferta: {leer: null, editar: null},
    modalidad: {leer: null, editar: null},
    precioUnidadProveedor: {leer: null, editar: null},
    precioTotalProveedor: {leer: null, editar: null},
    precioUnidadVenta: {leer: null, editar: null},
    precioTotalVenta: {leer: null, editar: null},
    precioUnidadCliente: {leer: null, editar: null},
    precioTotalCliente: {leer: null, editar: null},
    margen: {leer: null, editar: null},
    tipoAdquisicion: {leer: null, editar: null},
    proveedor: {leer: null, editar: null},
    tasOfertaAnterior: {leer: null, editar: null},
    fechaDespachoSupervisor: {leer: null, editar: null},
    semanaDespachoSupervisor: {leer: null, editar: null},
    fechaDespachoCompras: {leer: null, editar: null},
    semanaDespachoCompras: {leer: null, editar: null},
    fechaRespuestaCompras: {leer: null, editar: null},
    semanaRespuestaCompras: {leer: null, editar: null},
    fechaEnvioOfertaCliente: {leer: null, editar: null},
    semanaEnvioOfertaCliente: {leer: null, editar: null},
    fechaEnvioOfertaClienteNegociada: {leer: null, editar: null},
    semanaEnvioOfertaClienteNegociada: {leer: null, editar: null},
    fechaRespuestaCliente: {leer: null, editar: null},
    semanaRespuestaCliente: {leer: null, editar: null},
    fechaRespuestaClienteNegociada: {leer: null, editar: null},
    semanaRespuestaClienteNegociada: {leer: null, editar: null},
    tipoRespuestaCliente: {leer: null, editar: null},
    tipoRespuestaClienteNegociada: {leer: null, editar: null},
    po: {leer: null, editar: null},
    fechaPo: {leer: null, editar: null},
    valorPo: {leer: null, editar: null},
    comentarioAnalista: {leer: null, editar: null},
    subestadoOferta: {leer: null, editar: null},
    estadoOferta: {leer: null, editar: null},
    fechaEntregaAlmacen: {leer: null, editar: null},
    comentarioAlmacenista: {leer: null, editar: null},
    comentarioCoordinador: {leer: null, editar: null},
    tipoElemento: {leer: null, editar: null},
    valorConciliadoCliente: {leer: null, editar: null},
    fechaConciliadoCliente: {leer: null, editar: null},
    comentarioFacturador: {leer: null, editar: null},
    fechaEnvioActaSmu: {leer: null, editar: null},
    comentarioActa: {leer: null, editar: null},
    fechaFirmaActaSmu: {leer: null, editar: null},
    fechaGrSm: {leer: null, editar: null}
  };

  constructor(
    private offersService: OffersService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private adminService: AdminService,
    private appService: AppService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.appService.validateSecurity(this.route.snapshot.routeConfig.path, true)
      .then(res => {
        // Get permissions view
        this.permissionsView = res[0].permissionsView;
        // Get cols offer
        let data = res[1].colsOffer;
        // Loop cols offer from server
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].permissions.length; j++) {
            // Update permissionsFields object
            this.permissionsFields[data[i].db][data[i].permissions[j].name] = data[i].permissions[j].checked;
            // Build columns array general for read
            if (data[i].permissions[j].name === 'leer' && data[i].permissions[j].checked) {
              this.offersAllColumns.push(data[i].db);
              if (data[i].own === true) this.offersColumnsDynamics.push(data[i].db)
            }

          }
        }
        // Refactor pending on future
        this.authService.currentUser()
          .subscribe(res => {
            this.currentUser = res;
            if (this.currentUser.roles) {
              this.offersService.getOffers()
                .subscribe(res => {
                  // Filter offers by rol
                  let filteredOffers = [];
                  if (this.currentUser.roles.Administrador) {
                    this.dataSourceOffers = new MatTableDataSource(res.data.ofertas);
                  } else if (this.currentUser.roles.Supervisor) {
                    for (let i = 0; i < res.data.ofertas.length; i++) {
                      if (res.data.ofertas[i].ordenSuministro) {
                        if (res.data.ofertas[i].ordenSuministro.solicitud.supervisorId == this.currentUser.id) {
                          filteredOffers.push(res.data.ofertas[i]);
                        }
                      } else if (res.data.ofertas[i].ordenServicio) {
                        if (res.data.ofertas[i].ordenServicio.solicitud.supervisorId == this.currentUser.id) {
                          filteredOffers.push(res.data.ofertas[i]);
                        }
                      }
                    }
                    this.dataSourceOffers = new MatTableDataSource(filteredOffers);
                  } else if (this.currentUser.roles.Analista) {
                    for (let i = 0; i < res.data.ofertas.length; i++) {
                      if (res.data.ofertas[i].ordenSuministro) {
                        if (res.data.ofertas[i].ordenSuministro.solicitud.analistaId == this.currentUser.id) {
                          filteredOffers.push(res.data.ofertas[i]);
                        }
                      } else if (res.data.ofertas[i].ordenServicio) {
                        if (res.data.ofertas[i].ordenServicio.solicitud.analistaId == this.currentUser.id) {
                          filteredOffers.push(res.data.ofertas[i]);
                        }
                      }
                    }
                    this.dataSourceOffers = new MatTableDataSource(filteredOffers);
                  } else {
                    this.dataSourceOffers = new MatTableDataSource(res.data.ofertas);
                  }
                  this.dataSourceOffers.paginator = this.paginator;
                  this.dataSourceOffers.sort = this.sort;
                  this.isLoadingResultsOffers = false;
                }, error => {
                  this.isLoadingResultsOffers = false;
                  this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de ofertas', error);
                });
            }
          }, error => {
            this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de usuario actual', error);
          })
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Validación de seguridad', error);
      })

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceOffers.filter = filterValue;
  }

  selectRow(index, data) {
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }

  goToEdit() {
    this.router.navigate([`dashboard/ofertas/${this.currentRowSelectData.id}`]);
  }

  deleteOffer() {
    this.offersService.deleteOffer(this.currentRowSelectData.id)
      .subscribe(res => {
        if (res.data.deleteOferta.status === 200)
          this.router.navigate(['/ofertas']);
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Eliminar oferta', error);
      })
  }

  export() {
    localStorage.setItem('currentExport', 'offers');
    this.router.navigate(['dashboard/exportar'], { queryParams: this.currentUser.roles, skipLocationChange: true });
  }

  isArray(obj: any) {
    return Array.isArray(obj);
  }

  isObject(val: any) {
    return (typeof val === 'object');
  }

  isString(val: any) {
    return (typeof val === 'string');
  }

}

