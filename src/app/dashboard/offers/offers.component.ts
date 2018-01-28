import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { OffersService } from "./offers.service";
import { AuthService } from '../../auth/auth.service';
import { AppService } from "../../app.service";


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['../dashboard.component.scss', 'offers.component.scss']
})

export class OffersComponent implements OnInit {

  offersColumns = [
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
    'suministroServicioComentario'
  ];

  offersColumnsDynamics = [
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

  offersAllColumns = [
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

  dataSourceOffers = new MatTableDataSource();
  isLoadingResultsOffers = true;
  currentRowSelect: any;
  currentRowSelectData: any = {};
  currentUser: any;

  permissionsView = {
    crear: null,
    leer: null,
    editar: null,
    eliminar: null,
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private offersService: OffersService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private appService: AppService
  ) {
    this.appService.validateSecurity(this.route.snapshot.routeConfig.path)
      .then(res => {
        this.permissionsView = {
          crear: res['crear'],
          leer: res['leer'],
          editar: res['editar'],
          eliminar: res['eliminar']
        }
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Validación de seguridad', error);
      })
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.authService.currentUser()
      .subscribe(res => {
        this.currentUser = res;
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
              this.dataSourceOffers = new MatTableDataSource(filteredOffers)
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
              this.dataSourceOffers = new MatTableDataSource(filteredOffers)
            }
            this.dataSourceOffers.paginator = this.paginator;
            this.dataSourceOffers.sort = this.sort;
            this.isLoadingResultsOffers = false;
          }, error => {
            this.isLoadingResultsOffers = false;
            this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de ofertas', error);
          });
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de usuario actual', error);
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

