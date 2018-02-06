import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsFields } from '../offers/offer.data';
import { RequestsService } from '../requests/requests.service';
import { OffersService } from '../offers/offers.service';
import { AuthService } from '../../auth/auth.service';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})

export class ExportComponent implements OnInit {

  data: any;
  requests: any;
  offers: any;
  modelToExport: string;
  currentUser: any;
  isSelectAll: boolean = false;

  permissionsFields = PermissionsFields;

  columnsRequest = [
    {name: 'id', checked: false},
    {name: 'supervisor', checked: false},
    {name: 'analista', checked: false},
    {name: 'tas', checked: false},
    {name: 'estacion', checked: false},
    {name: 'subsistema', checked: false},
    {name: 'prioridad', checked: false},
    {name: 'estadoSolicitud', checked: false}
  ];

  columnsOffer = [
    {name: 'id', db: 'id', checked: false},
    {name: 'solicitudId', db: 'solicitudId', checked: false},
    {name: 'supervisor', db: 'solicitudSupervisor', checked: false},
    {name: 'analista', db: 'solicitudAnalista', checked: false},
    {name: 'estacionNombre', db: 'solicitudEstacionNombre', checked: false},
    {name: 'estacionRegion', db: 'solicitudEstacionRegion', checked: false},
    {name: 'estacionDepartamento', db: 'solicitudEstacionDepartamento', checked: false},
    {name: 'estacionCiudad', db: 'solicitudEstacionCiudad', checked: false},
    {name: 'suministroServicioId', db: 'suministroServicioId', checked: false},
    {name: 'suministroServicioNombre', db: 'suministroServicioNombre', checked: false},
    {name: 'suministroServicioDescripcion', db: 'suministroServicioDescripcion', checked: false},
    {name: 'suministroServicioCodigoLpu', db: 'suministroServicioCodigoLpu', checked: false},
    {name: 'suministroServicioDescripcionLpu', db: 'suministroServicioDescripcionLpu', checked: false},
    {name: 'suministroServicioValorLpu', db: 'suministroServicioValorLpu', checked: false},
    {name: 'suministroServicioUnidad', db: 'suministroServicioUnidad', checked: false},
    {name: 'suministroServicioQty', db: 'suministroServicioQty', checked: false},
    {name: 'suministroServicioComentario', db: 'suministroServicioComentario', checked: false},
    {name: 'tipoSitio', db: 'tipoSitio', checked: false},
    {name: 'tipoAcceso', db: 'tipoAcceso', checked: false},
    {name: 'naturalezaServicio', db: 'naturalezaServicio', checked: false},
    {name: 'descripcionOds', db: 'descripcionOds', checked: false},
    {name: 'fechaRecibidoOds', db: 'fechaRecibidoOds', checked: false},
    {name: 'semanaRecibidoOds', db: 'semanaRecibidoOds', checked: false},
    {name: 'tipoOferta', db: 'tipoOferta', checked: false},
    {name: 'workOrder', db: 'workOrder', checked: false},
    {name: 'descripcionTarea', db: 'descripcionTarea', checked: false},
    {name: 'encargadoCliente', db: 'encargadoCliente', checked: false},
    {name: 'fechaEjecucion', db: 'fechaEjecucion', checked: false},
    {name: 'confirmacionRecibido', db: 'confirmacionRecibido', checked: false},
    {name: 'comentarioSupervisor', db: 'comentarioSupervisor', checked: false},
    {name: 'numeroOferta', db: 'numeroOferta', checked: false},
    {name: 'modalidad', db: 'modalidad', checked: false},
    {name: 'precioUnidadProveedor', db: 'precioUnidadProveedor', checked: false},
    {name: 'precioTotalProveedor', db: 'precioTotalProveedor', checked: false},
    {name: 'precioUnidadVenta', db: 'precioUnidadVenta', checked: false},
    {name: 'precioTotalVenta', db: 'precioTotalVenta', checked: false},
    {name: 'precioUnidadCliente', db: 'precioUnidadCliente', checked: false},
    {name: 'precioTotalCliente', db: 'precioTotalCliente', checked: false},
    {name: 'margen', db: 'margen', checked: false},
    {name: 'tipoAdquisicion', db: 'tipoAdquisicion', checked: false},
    {name: 'proveedor', db: 'proveedor', checked: false},
    {name: 'tasOfertaAnterior', db: 'tasOfertaAnterior', checked: false},
    {name: 'fechaDespachoSupervisor', db: 'fechaDespachoSupervisor', checked: false},
    {name: 'semanaDespachoSupervisor', db: 'semanaDespachoSupervisor', checked: false},
    {name: 'fechaDespachoCompras', db: 'fechaDespachoCompras', checked: false},
    {name: 'semanaDespachoCompras', db: 'semanaDespachoCompras', checked: false},
    {name: 'fechaRespuestaCompras', db: 'fechaRespuestaCompras', checked: false},
    {name: 'semanaRespuestaCompras', db: 'semanaRespuestaCompras', checked: false},
    {name: 'fechaEnvioOfertaCliente', db: 'fechaEnvioOfertaCliente', checked: false},
    {name: 'semanaEnvioOfertaCliente', db: 'semanaEnvioOfertaCliente', checked: false},
    {name: 'fechaEnvioOfertaClienteNegociada', db: 'fechaEnvioOfertaClienteNegociada', checked: false},
    {name: 'semanaEnvioOfertaClienteNegociada', db: 'semanaEnvioOfertaClienteNegociada', checked: false},
    {name: 'fechaRespuestaCliente', db: 'fechaRespuestaCliente', checked: false},
    {name: 'semanaRespuestaCliente', db: 'semanaRespuestaCliente', checked: false},
    {name: 'fechaRespuestaClienteNegociada', db: 'fechaRespuestaClienteNegociada', checked: false},
    {name: 'semanaRespuestaClienteNegociada', db: 'semanaRespuestaClienteNegociada', checked: false},
    {name: 'tipoRespuestaCliente', db: 'tipoRespuestaCliente', checked: false},
    {name: 'tipoRespuestaClienteNegociada', db: 'tipoRespuestaClienteNegociada', checked: false},
    {name: 'po', db: 'po', checked: false},
    {name: 'fechaPo', db: 'fechaPo', checked: false},
    {name: 'valorPo', db: 'valorPo', checked: false},
    {name: 'comentarioAnalista', db: 'comentarioAnalista', checked: false},
    {name: 'subestadoOferta', db: 'subestadoOferta', checked: false},
    {name: 'estadoOferta', db: 'estadoOferta', checked: false},
    {name: 'fechaEntregaAlmacen', db: 'fechaEntregaAlmacen', checked: false},
    {name: 'comentarioAlmacenista', db: 'comentarioAlmacenista', checked: false},
    {name: 'comentarioCoordinador', db: 'comentarioCoordinador', checked: false},
    {name: 'tipoElemento', db: 'tipoElemento', checked: false},
    {name: 'valorConciliadoCliente', db: 'valorConciliadoCliente', checked: false},
    {name: 'fechaConciliadoCliente', db: 'fechaConciliadoCliente', checked: false},
    {name: 'comentarioFacturador', db: 'comentarioFacturador', checked: false},
    {name: 'fechaEnvioActaSmu', db: 'fechaEnvioActaSmu', checked: false},
    {name: 'comentarioActa', db: 'comentarioActa', checked: false},
    {name: 'fechaFirmaActaSmu', db: 'fechaFirmaActaSmu', checked: false},
    {name: 'fechaGrSmu', db: 'fechaGrSmu', checked: false},
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestsService: RequestsService,
    private offersService: OffersService,
    private authService: AuthService,
    private appService: AppService
  ) {

    this.appService.validateSecurity(this.route.snapshot.routeConfig.path, true)
      .then(res => {
        // Get cols offer
        let data = res[1].colsOffer;
        // Loop cols offer from server
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].permissions.length; j++) {
            // Update permissionsFields object
            if (this.permissionsFields[data[i].db] === undefined) {
              debugger
            }
            this.permissionsFields[data[i].db][data[i].permissions[j].name] = data[i].permissions[j].checked;
          }
        }
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Validación de seguridad', error);
      })

    this.authService.currentUser()
      .subscribe(res => {
        this.currentUser = res;
        this.modelToExport = localStorage.getItem('currentExport');
        // Requests logic
        if (this.modelToExport === 'requests') {
          this.requestsService.getRequests()
            .subscribe(res => {
              // Filter requests by rol
              let filteredRequests = [];
              if (this.currentUser.roles.Administrador) {
                this.requests = res.data.solicitudes;
              } else if (this.currentUser.roles.Supervisor) {
                for (let i = 0; i < res.data.solicitudes.length; i++) {
                  if (res.data.solicitudes[i].supervisorId == this.currentUser.id) {
                    filteredRequests.push(res.data.solicitudes[i]);
                  }
                }
                this.requests = filteredRequests;
              } else if (this.currentUser.roles.Analista) {
                for (let i = 0; i < res.data.solicitudes.length; i++) {
                  if (res.data.solicitudes[i].analistaId === this.currentUser.id) {
                    filteredRequests.push(res.data.solicitudes[i]);
                  }
                }
                this.requests = filteredRequests;
              }
            }, error => {
              this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de solicitudes', error);
            });
        }
        // Offer logic
        else if (this.modelToExport === 'offers') {
          this.offersService.getOffers()
            .subscribe(res => {
              // Filter offers by rol
              let filteredOffers = [];
              if (this.currentUser.roles.Administrador) {
                this.offers = res.data.ofertas;
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
                this.offers = filteredOffers;
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
                this.offers = filteredOffers;
              } else {
                this.offers = res.data.ofertas;
              }
            }, error => {
              this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de ofertas', error);
            });
        }
      }, error => {
        debugger
      })


  }

  ngOnInit() { }

  selectAll() {
    this.isSelectAll = !this.isSelectAll;
    if (this.isSelectAll) {
      if (this.modelToExport === 'requests') {
        for (let i = 0; i < this.columnsRequest.length; i++) {
          this.columnsRequest[i].checked = true;
        }
      }
      else if (this.modelToExport === 'offers') {
        for (let i = 0; i < this.columnsOffer.length; i++) {
          if (this.permissionsFields[this.columnsOffer[i].db].leer)
            this.columnsOffer[i].checked = true;
        }
      }
    } else {
      if (this.modelToExport === 'requests') {
        for (let i = 0; i < this.columnsRequest.length; i++) {
          this.columnsRequest[i].checked = false;
        }
      }
      else if (this.modelToExport === 'offers') {
        for (let i = 0; i < this.columnsOffer.length; i++) {
          this.columnsOffer[i].checked = false;
        }
      }
    }
  }

  selectColRow(item) {
    item.checked = !item.checked;
  }

  fieldsModeltSelected: any[] = [];
  dataBuildModel: any = [];

  requestsExport() {
    this.dataBuildModel = [];
    // Extract columns selected for request
    for (let i = 0; i < this.columnsRequest.length; i++) {
      if (this.columnsRequest[i].checked) {
        this.fieldsModeltSelected.push(this.columnsRequest[i].name);
      }
    }
    // Build requests array filtering by selected columns
    for (let j = 0; j < this.requests.length; j++) {
      let tempData = {};
      for (let k = 0; k < this.fieldsModeltSelected.length; k++) {
        if (this.fieldsModeltSelected[k] === 'estacion' || this.fieldsModeltSelected[k] === 'subsistema')
          tempData[this.fieldsModeltSelected[k]] = this.requests[j][this.fieldsModeltSelected[k]].nombre;
        else
          tempData[this.fieldsModeltSelected[k]] = this.requests[j][this.fieldsModeltSelected[k]];
      }
      this.dataBuildModel.push(tempData);
    }
    this.appService.exportAsExcelFile(this.dataBuildModel, 'solicitudes');
  }

  offersExport() {
    this.dataBuildModel = [];
    // Extract columns selected for offers
    for (let i = 0; i < this.columnsOffer.length; i++) {
      if (this.columnsOffer[i].checked) {
        this.fieldsModeltSelected.push(this.columnsOffer[i].name);
      }
    }
    // Build offers array filtering by selected columns
    for (let j = 0; j < this.offers.length; j++) {
      let tempData = {};
      for (let k = 0; k < this.fieldsModeltSelected.length; k++) {
        if (this.fieldsModeltSelected[k] === 'solicitudId')
          tempData[this.fieldsModeltSelected[k]] = this.offers[j].idSolicitud;
        else if (this.fieldsModeltSelected[k] === 'supervisor')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.solicitud.supervisor : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.solicitud.supervisor;
        else if (this.fieldsModeltSelected[k] === 'analista')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.solicitud.analista : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.solicitud.analista;
        else if (this.fieldsModeltSelected[k] === 'estacionNombre')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.solicitud.estacion.nombre : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.solicitud.estacion.nombre;
        else if (this.fieldsModeltSelected[k] === 'estacionRegion')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.solicitud.estacion.region : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.solicitud.estacion.region;
        else if (this.fieldsModeltSelected[k] === 'estacionDepartamento')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.solicitud.estacion.departamento : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.solicitud.estacion.departamento;
        else if (this.fieldsModeltSelected[k] === 'estacionCiudad')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.solicitud.estacion.ciudad : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.solicitud.estacion.ciudad;
        else if (this.fieldsModeltSelected[k] === 'suministroServicioId')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.suministro.id : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.servicio.id;
        else if (this.fieldsModeltSelected[k] === 'suministroServicioNombre')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.suministro.nombre : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.servicio.nombre;
        else if (this.fieldsModeltSelected[k] === 'suministroServicioDescripcion')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.suministro.descripcion : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.servicio.descripcion;
        else if (this.fieldsModeltSelected[k] === 'suministroServicioCodigoLpu')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.suministro.codigoLpu : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.servicio.codigoLpu;
        else if (this.fieldsModeltSelected[k] === 'suministroServicioDescripcionLpu')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.suministro.descripcionLpu : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.servicio.descripcionLpu;
        else if (this.fieldsModeltSelected[k] === 'suministroServicioValorLpu')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.suministro.valorLpu : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.servicio.valorLpu;
        else if (this.fieldsModeltSelected[k] === 'suministroServicioUnidad')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.suministro.unidad : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.servicio.unidad;
        else if (this.fieldsModeltSelected[k] === 'suministroServicioQty')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.suministro.cantidad : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.servicio.cantidad;
        else if (this.fieldsModeltSelected[k] === 'suministroServicioComentario')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.suministro.comentario : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.servicio.comentario;
        else
          tempData[this.fieldsModeltSelected[k]] = this.offers[j][this.fieldsModeltSelected[k]];
      }
      this.dataBuildModel.push(tempData);
    }
    this.appService.exportAsExcelFile(this.dataBuildModel, 'ofertas');
  }

  validateFieldShow(field: string) {
    if (this.permissionsFields[field].leer) return true
    else return false
  }

}
