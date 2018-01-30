import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from '../requests/requests.service';
import { OffersService } from '../offers/offers.service';
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
    {name: 'id', checked: false},
    {name: 'solicitudId', checked: false},
    {name: 'supervisor', checked: false},
    {name: 'analista', checked: false},
    {name: 'estacionNombre', checked: false},
    {name: 'estacionRegion', checked: false},
    {name: 'estacionDepartamento', checked: false},
    {name: 'estacionCiudad', checked: false},
    {name: 'suministroServicioId', checked: false},
    {name: 'suministroServicioNombre', checked: false},
    {name: 'suministroServicioDescripcion', checked: false},
    {name: 'suministroServicioCodigoLpu', checked: false},
    {name: 'suministroServicioDescripcionLpu', checked: false},
    {name: 'suministroServicioValorLpu', checked: false},
    {name: 'suministroServicioUnidad', checked: false},
    {name: 'suministroServicioQty', checked: false},
    {name: 'suministroServicioComentario', checked: false},
    {name: 'tipoSitio', checked: false},
    {name: 'tipoAcceso', checked: false},
    {name: 'naturalezaServicio', checked: false},
    {name: 'descripcionOds', checked: false},
    {name: 'fechaRecibidoOds', checked: false},
    {name: 'semanaRecibidoOds', checked: false},
    {name: 'tipoOferta', checked: false},
    {name: 'workOrder', checked: false},
    {name: 'descripcionTarea', checked: false},
    {name: 'encargadoCliente', checked: false},
    {name: 'fechaEjecucion', checked: false},
    {name: 'confirmacionRecibido', checked: false},
    {name: 'comentarioSupervisor', checked: false},
    {name: 'numeroOferta', checked: false},
    {name: 'modalidad', checked: false},
    {name: 'precioUnidadProveedor', checked: false},
    {name: 'precioTotalProveedor', checked: false},
    {name: 'precioUnidadVenta', checked: false},
    {name: 'precioTotalVenta', checked: false},
    {name: 'precioUnidadCliente', checked: false},
    {name: 'precioTotalCliente', checked: false},
    {name: 'margen', checked: false},
    {name: 'tipoAdquisicion', checked: false},
    {name: 'proveedor', checked: false},
    {name: 'tasOfertaAnterior', checked: false},
    {name: 'fechaDespachoSupervisor', checked: false},
    {name: 'semanaDespachoSupervisor', checked: false},
    {name: 'fechaDespachoCompras', checked: false},
    {name: 'semanaDespachoCompras', checked: false},
    {name: 'fechaRespuestaCompras', checked: false},
    {name: 'semanaRespuestaCompras', checked: false},
    {name: 'fechaEnvioOfertaCliente', checked: false},
    {name: 'semanaEnvioOfertaCliente', checked: false},
    {name: 'fechaEnvioOfertaClienteNegociada', checked: false},
    {name: 'semanaEnvioOfertaClienteNegociada', checked: false},
    {name: 'fechaRespuestaCliente', checked: false},
    {name: 'semanaRespuestaCliente', checked: false},
    {name: 'fechaRespuestaClienteNegociada', checked: false},
    {name: 'semanaRespuestaClienteNegociada', checked: false},
    {name: 'tipoRespuestaCliente', checked: false},
    {name: 'tipoRespuestaClienteNegociada', checked: false},
    {name: 'po', checked: false},
    {name: 'fechaPo', checked: false},
    {name: 'valorPo', checked: false},
    {name: 'comentarioAnalista', checked: false},
    {name: 'subestadoOferta', checked: false},
    {name: 'estadoOferta', checked: false},
    {name: 'fechaEntregaAlmacen', checked: false},
    {name: 'comentarioAlmacenista', checked: false},
    {name: 'comentarioCoordinador', checked: false},
    {name: 'tipoElemento', checked: false},
    {name: 'valorConciliadoCliente', checked: false},
    {name: 'fechaConciliadoCliente', checked: false},
    {name: 'comentarioFacturador', checked: false},
    {name: 'fechaEnvioActaSmu', checked: false},
    {name: 'comentarioActa', checked: false},
    {name: 'fechaFirmaActaSmu', checked: false},
    {name: 'fechaGrSmu', checked: false},
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestsService: RequestsService,
    private offersService: OffersService,
    private appService: AppService
  ) {
    this.currentUser = this.route.snapshot.queryParams;
    this.modelToExport = localStorage.getItem('currentExport');
    // Requests logic
    if (this.modelToExport === 'requests') {
      this.requestsService.getRequests()
        .subscribe(res => {
          // Filter requests by rol
          let filteredRequests = [];
          if (this.currentUser.Administrador) {
            this.requests = res.data.solicitudes;
          } else if (this.currentUser.Supervisor) {
            for (let i = 0; i < res.data.solicitudes.length; i++) {
              if (res.data.solicitudes[i].supervisorId == this.currentUser.id) {
                filteredRequests.push(res.data.solicitudes[i]);
              }
            }
            this.requests = filteredRequests;
          } else if (this.currentUser.Analista) {
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
          if (this.currentUser.Administrador) {
            this.offers = res.data.ofertas;
          } else if (this.currentUser.Supervisor) {
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
          } else if (this.currentUser.Analista) {
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
          }
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de ofertas', error);
        });
    }
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
    // Build offerss array filtering by selected columns
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

}

// { name: 'suministroServicioComentario', checked: false },