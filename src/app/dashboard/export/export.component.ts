import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
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
    {name: 'estadoSolicitud', checked: false},
    {name: 'creado', checked: false},
    {name: 'actualizado', checked: false}
  ];

  columnsOffer = [
    {name: 'id', db: 'id', checked: false},
    {name: 'solicitud id', db: 'solicitudId', checked: false},
    {name: 'supervisor', db: 'solicitudSupervisor', checked: false},
    {name: 'analista', db: 'solicitudAnalista', checked: false},
    {name: 'estacion nombre', db: 'solicitudEstacionNombre', checked: false},
    {name: 'estacion region', db: 'solicitudEstacionRegion', checked: false},
    {name: 'estacion departamento', db: 'solicitudEstacionDepartamento', checked: false},
    {name: 'estacion ciudad', db: 'solicitudEstacionCiudad', checked: false},
    {name: 'suministro servicio id', db: 'suministroServicioId', checked: false},
    {name: 'suministro servicio nombre', db: 'suministroServicioNombre', checked: false},
    {name: 'suministro servicio descripcion', db: 'suministroServicioDescripcion', checked: false},
    {name: 'suministro servicio codigo lpu', db: 'suministroServicioCodigoLpu', checked: false},
    {name: 'suministro servicio descripcion lpu', db: 'suministroServicioDescripcionLpu', checked: false},
    {name: 'suministro servicio valor lpu', db: 'suministroServicioValorLpu', checked: false},
    {name: 'suministro servicio unidad', db: 'suministroServicioUnidad', checked: false},
    {name: 'suministro servicio qty', db: 'suministroServicioQty', checked: false},
    {name: 'suministro servicio comentario', db: 'suministroServicioComentario', checked: false},
    {name: 'tipo sitio', db: 'tipoSitio', checked: false},
    {name: 'tipo acceso', db: 'tipoAcceso', checked: false},
    {name: 'naturaleza servicio', db: 'naturalezaServicio', checked: false},
    {name: 'descripcion ods', db: 'descripcionOds', checked: false},
    {name: 'fecha recibido ods', db: 'fechaRecibidoOds', checked: false},
    {name: 'semana recibido ods', db: 'semanaRecibidoOds', checked: false},
    {name: 'tipo oferta', db: 'tipoOferta', checked: false},
    {name: 'work order', db: 'workOrder', checked: false},
    {name: 'descripcion tarea', db: 'descripcionTarea', checked: false},
    {name: 'encargado cliente', db: 'encargadoCliente', checked: false},
    {name: 'fecha ejecucion', db: 'fechaEjecucion', checked: false},
    {name: 'confirmacion recibido', db: 'confirmacionRecibido', checked: false},
    {name: 'comentario supervisor', db: 'comentarioSupervisor', checked: false},
    {name: 'numero oferta', db: 'numeroOferta', checked: false},
    {name: 'modalidad', db: 'modalidad', checked: false},
    {name: 'precio unidad proveedor', db: 'precioUnidadProveedor', checked: false},
    {name: 'precio total proveedor', db: 'precioTotalProveedor', checked: false},
    {name: 'precio unidad venta', db: 'precioUnidadVenta', checked: false},
    {name: 'precio total venta', db: 'precioTotalVenta', checked: false},
    {name: 'precio unidad cliente', db: 'precioUnidadCliente', checked: false},
    {name: 'precio total cliente', db: 'precioTotalCliente', checked: false},
    {name: 'margen', db: 'margen', checked: false},
    {name: 'tipo adquisicion', db: 'tipoAdquisicion', checked: false},
    {name: 'proveedor', db: 'proveedor', checked: false},
    {name: 'tasOfertaAnterior', db: 'tasOfertaAnterior', checked: false},
    {name: 'fecha despacho supervisor', db: 'fechaDespachoSupervisor', checked: false},
    {name: 'semana despacho supervisor', db: 'semanaDespachoSupervisor', checked: false},
    {name: 'fecha despacho compras', db: 'fechaDespachoCompras', checked: false},
    {name: 'semana despacho compras', db: 'semanaDespachoCompras', checked: false},
    {name: 'fecha respuesta compras', db: 'fechaRespuestaCompras', checked: false},
    {name: 'semana respuesta compras', db: 'semanaRespuestaCompras', checked: false},
    {name: 'fecha envio oferta cliente', db: 'fechaEnvioOfertaCliente', checked: false},
    {name: 'semana envio oferta cliente', db: 'semanaEnvioOfertaCliente', checked: false},
    {name: 'fecha envio oferta cliente negociada', db: 'fechaEnvioOfertaClienteNegociada', checked: false},
    {name: 'semana envio oferta cliente negociada', db: 'semanaEnvioOfertaClienteNegociada', checked: false},
    {name: 'fecha respuesta cliente', db: 'fechaRespuestaCliente', checked: false},
    {name: 'semana respuesta cliente', db: 'semanaRespuestaCliente', checked: false},
    {name: 'fecha respuesta cliente negociada', db: 'fechaRespuestaClienteNegociada', checked: false},
    {name: 'semana respuesta cliente negociada', db: 'semanaRespuestaClienteNegociada', checked: false},
    {name: 'tipo respuesta cliente', db: 'tipoRespuestaCliente', checked: false},
    {name: 'tipo respuesta cliente negociada', db: 'tipoRespuestaClienteNegociada', checked: false},
    {name: 'po', db: 'po', checked: false},
    {name: 'fecha po', db: 'fechaPo', checked: false},
    {name: 'valor po', db: 'valorPo', checked: false},
    {name: 'comentario analista', db: 'comentarioAnalista', checked: false},
    {name: 'subestado oferta', db: 'subestadoOferta', checked: false},
    {name: 'estado oferta', db: 'estadoOferta', checked: false},
    {name: 'fecha entrega almacen', db: 'fechaEntregaAlmacen', checked: false},
    {name: 'comentario almacenista', db: 'comentarioAlmacenista', checked: false},
    {name: 'comentario coordinador', db: 'comentarioCoordinador', checked: false},
    {name: 'tipo elemento', db: 'tipoElemento', checked: false},
    {name: 'valor conciliado cliente', db: 'valorConciliadoCliente', checked: false},
    {name: 'fecha conciliado cliente', db: 'fechaConciliadoCliente', checked: false},
    {name: 'comentario facturador', db: 'comentarioFacturador', checked: false},
    {name: 'fecha envio acta smu', db: 'fechaEnvioActaSmu', checked: false},
    {name: 'comentario acta', db: 'comentarioActa', checked: false},
    {name: 'fecha firma acta smu', db: 'fechaFirmaActaSmu', checked: false},
    {name: 'fecha gr smu', db: 'fechaGrSmu', checked: false},
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
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
        else if (this.fieldsModeltSelected[k] === 'creado' || this.fieldsModeltSelected[k] === 'actualizado')
          tempData[this.fieldsModeltSelected[k]] = this.datePipe.transform(this.requests[j][this.fieldsModeltSelected[k]], 'MMM d, y, h:mm:ss a');
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
        this.fieldsModeltSelected.push(this.columnsOffer[i].db);
      }
    }
    // Build offers array filtering by selected columns
    for (let j = 0; j < this.offers.length; j++) {
      let tempData = {};
      for (let k = 0; k < this.fieldsModeltSelected.length; k++) {
        if (this.fieldsModeltSelected[k] === 'solicitudId')
          tempData[this.fieldsModeltSelected[k]] = this.offers[j].idSolicitud;
        else if (this.fieldsModeltSelected[k] === 'solicitudSupervisor')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.solicitud.supervisor : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.solicitud.supervisor;
        else if (this.fieldsModeltSelected[k] === 'solicitudAnalista')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.solicitud.analista : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.solicitud.analista;
        else if (this.fieldsModeltSelected[k] === 'solicitudEstacionNombre')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.solicitud.estacion.nombre : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.solicitud.estacion.nombre;
        else if (this.fieldsModeltSelected[k] === 'solicitudEstacionRegion')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.solicitud.estacion.region : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.solicitud.estacion.region;
        else if (this.fieldsModeltSelected[k] === 'solicitudEstacionDepartamento')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.solicitud.estacion.departamento : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.solicitud.estacion.departamento;
        else if (this.fieldsModeltSelected[k] === 'solicitudEstacionCiudad')
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
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.cantidad : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.cantidad;
        else if (this.fieldsModeltSelected[k] === 'suministroServicioComentario')
          this.offers[j].ordenSuministro ? tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenSuministro.comentario : tempData[this.fieldsModeltSelected[k]] = this.offers[j].ordenServicio.comentario;
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
