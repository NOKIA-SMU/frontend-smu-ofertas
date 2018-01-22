import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffersService } from './offers.service';
import { AuthService } from "../../auth/auth.service";
import { AppService } from "../../app.service";
import { CurrencyPipe } from '@angular/common';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-offer-operate',
  templateUrl: './offer-operate.component.html',
  styleUrls: ['../dashboard.component.scss', './offers.component.scss']
})

export class OfferOperateComponent implements OnInit {

  isNew: boolean;
  offer: any;

  accessTypes: string[];
  sitesTypes: string[];
  natureServices: string[];
  offerTypes: string[];
  elementTypes: string[];
  modalities: string[];
  acquisitionTypes: string[];
  providers: string[];
  customerManager: any[] = [];
  typesClientResponse: string[];
  confirmationsReceived: string[];
  substatesOffer: string[];
  statesOffer: string[];

  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offersService: OffersService,
    private authService: AuthService,
    private appService: AppService,
    private adminService: AdminService
  ) {
    this.authService.currentUser()
      .subscribe(res => {
        this.currentUser = res;
      }, error => {
        debugger
      })

    this.offersService.getAccessTypes()
      .subscribe(res => {
        this.accessTypes = res.data.tipoAcceso
      }, error => {
        debugger
      })

    this.offersService.getSitesTypes()
      .subscribe(res => {
        this.sitesTypes = res.data.tipoSitio
      }, error => {
        debugger
      })

    this.offersService.getNatureServices()
      .subscribe(res => {
        this.natureServices = res.data.naturalezaServicio;
      }, error => {
        debugger
      })

    this.offersService.getOfferTypes()
      .subscribe(res => {
        this.offerTypes = res.data.tipoOferta;
      }, error => {
        debugger
      })

    this.offersService.getElementTypes()
      .subscribe(res => {
        this.elementTypes = res.data.tipoElemento;
      }, error => {
        debugger
      })

    this.offersService.getModalities()
      .subscribe(res => {
        this.modalities = res.data.modalidad;
      }, error => {
        debugger
      })

    this.offersService.getAcquisitionTypes()
      .subscribe(res => {
        this.acquisitionTypes = res.data.tipoAdquisicion;
      }, error => {
        debugger
      })

    this.offersService.getProviders()
      .subscribe(res => {
        this.providers = res.data.proveedor;
      }, error => {
        debugger
      })

    this.offersService.getTypesClientResponse()
      .subscribe(res => {
        this.typesClientResponse = res.data.tipoRespuestaCliente;
      }, error => {
        debugger
      })

    this.offersService.getSubstatesOffer()
      .subscribe(res => {
        this.substatesOffer = res.data.subestadoOferta;
      }, error => {
        debugger
      })

    this.offersService.getStatesOffer()
      .subscribe(res => {
        this.statesOffer = res.data.estadoOferta;
      }, error => {
        debugger
      })

    this.offersService.getConfirmationsReceived()
      .subscribe(res => {
        this.confirmationsReceived = res.data.confirmacionRecibido;
      }, error => {
        debugger
      })

    // Get profiles filter by customer manager
    this.adminService.getProfilesCustomerManager()
      .subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          let fullName = res[i].firstName + res[i].lastName;
          this.customerManager.push(fullName);
        }
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de encargado cliente', error)
      })
  }

  ngOnInit() {
    if (this.route.snapshot.params.id != 'crear') {
      this.isNew = false;
      this.offersService.getOfferById(this.route.snapshot.params.id)
        .subscribe(res => {
          this.offer = {
            id: res.data.oferta.id,
            ordenSuministro: res.data.oferta.ordenSuministro ? res.data.oferta.ordenSuministro.id : null,
            ordenServicio: res.data.oferta.ordenServicio ? res.data.oferta.ordenServicio.id : null,
            tipoSitio: res.data.oferta.tipoSitio ? res.data.oferta.tipoSitio.split('_').join(' ') : null,
            tipoAcceso: res.data.oferta.tipoAcceso ? res.data.oferta.tipoAcceso.split('_').join(' ') : null,
            naturalezaServicio: res.data.oferta.naturalezaServicio ? res.data.oferta.naturalezaServicio.split('_').join(' ') : null,
            descripcionOds: res.data.oferta.descripcionOds,
            fechaRecibidoOds: res.data.oferta.fechaRecibidoOds,
            tipoOferta: res.data.oferta.tipoOferta ? res.data.oferta.tipoOferta.split('_').join(' ') : null,
            workOrder: res.data.oferta.workOrder,
            descripcionTarea: res.data.oferta.descripcionTarea,
            encargadoCliente: res.data.oferta.encargadoCliente,
            fechaEjecucion: res.data.oferta.fechaEjecucion,
            confirmacionRecibido: res.data.oferta.confirmacionRecibido ? res.data.oferta.confirmacionRecibido.split('_').join(' ') : null,
            comentarioSupervisor: res.data.oferta.comentarioSupervisor,
            numeroOferta: res.data.oferta.numeroOferta,
            modalidad: res.data.oferta.modalidad ? res.data.oferta.modalidad.split('_').join(' ') : null,
            precioUnidadProveedor: res.data.oferta.precioUnidadProveedor,
            precioUnidadVenta: res.data.oferta.precioUnidadVenta,
            precioUnidadCliente: res.data.oferta.precioUnidadCliente,
            tipoAdquisicion: res.data.oferta.tipoAdquisicion ? res.data.oferta.tipoAdquisicion.split('_').join(' ') : null,
            proveedor: res.data.oferta.proveedor ? res.data.oferta.proveedor.split('_').join(' ') : null,
            tasOfertaAnterior: res.data.oferta.tasOfertaAnterior,
            fechaDespachoSupervisor: res.data.oferta.fechaDespachoSupervisor,
            fechaDespachoCompras: res.data.oferta.fechaDespachoCompras,
            fechaRespuestaCompras: res.data.oferta.fechaRespuestaCompras,
            fechaEnvioOfertaCliente: res.data.oferta.fechaEnvioOfertaCliente,
            fechaEnvioOfertaClienteNegociada: res.data.oferta.fechaEnvioOfertaClienteNegociada,
            fechaRespuestaCliente: res.data.oferta.fechaRespuestaCliente,
            fechaRespuestaClienteNegociada: res.data.oferta.fechaRespuestaClienteNegociada,
            tipoRespuestaCliente: res.data.oferta.tipoRespuestaCliente ? res.data.oferta.tipoRespuestaCliente.split('_').join(' ') : null,
            tipoRespuestaClienteNegociada: res.data.oferta.tipoRespuestaClienteNegociada ? res.data.oferta.tipoRespuestaClienteNegociada.split('_').join(' ') : null,
            po: res.data.oferta.po,
            fechaPo: res.data.oferta.fechaPo,
            valorPo: res.data.oferta.valorPo,
            comentarioAnalista: res.data.oferta.comentarioAnalista,
            subestadoOferta: res.data.oferta.subestadoOferta ? res.data.oferta.subestadoOferta.split('_').join(' ') : null,
            estadoOferta: res.data.oferta.estadoOferta ? res.data.oferta.estadoOferta.split('_').join(' ') : null,
            fechaEntregaAlmacen: res.data.oferta.fechaEntregaAlmacen,
            comentarioAlmacenista: res.data.oferta.comentarioAlmacenista,
            comentarioCoordinador: res.data.oferta.comentarioCoordinador,
            tipoElemento: res.data.oferta.tipoElemento ? res.data.oferta.tipoElemento.split('_').join(' ') : null,
            valorConciliadoCliente: res.data.oferta.valorConciliadoCliente,
            fechaConciliadoCliente: res.data.oferta.fechaConciliadoCliente,
            comentarioFacturador: res.data.oferta.comentarioFacturador,
            fechaEnvioActaSmu: res.data.oferta.fechaEnvioActaSmu,
            comentarioActa: res.data.oferta.comentarioActa,
            fechaFirmaActaSmu: res.data.oferta.fechaFirmaActaSmu,
            fechaGrSmu: res.data.oferta.fechaGrSmu
          }
        }, error => {
          debugger
        })
    }
  }

  normalizeDate(date) {
    if (typeof date === "object") {
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      return `${year}-${month + 1}-${day}`;
    }
    return date
  }

  saveOffert() {
    debugger
    let statesOffer = true;
    if (this.offer.workOrder) {
      if (this.offer.workOrder.length > 16) {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Work order excede 16 caracteres');
        statesOffer = false;
      } else
        statesOffer = true;
    }
    if (this.offer.tasOfertaAnterior) {
      if (this.offer.tasOfertaAnterior.length > 15) {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Tas oferta anterior excede 15 caracteres');
        statesOffer = false;
      } else
        statesOffer = true;
    }
    if (this.offer.numeroOferta) {
      if (this.offer.numeroOferta.length > 15) {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Numero oferta excede 15 caracteres');
        statesOffer = false;
      } else
        statesOffer = true;
    }
    if (statesOffer) {
      this.offer.encargadoCliente = this.offer.encargadoCliente.firstName + this.offer.encargadoCliente.lastName
      this.offer.fechaRecibidoOds == null ? null : this.normalizeDate(this.offer.fechaRecibidoOds);
      this.offer.fechaEjecucion == null ? null : this.normalizeDate(this.offer.fechaEjecucion);
      this.offer.fechaDespachoSupervisor == null ? null : this.normalizeDate(this.offer.fechaDespachoSupervisor);
      this.offer.fechaDespachoCompras == null ? null : this.normalizeDate(this.offer.fechaDespachoCompras);
      this.offer.fechaRespuestaCompras == null ? null : this.normalizeDate(this.offer.fechaRespuestaCompras);
      this.offer.fechaEnvioOfertaCliente == null ? null : this.normalizeDate(this.offer.fechaEnvioOfertaCliente);
      this.offer.fechaEnvioOfertaClienteNegociada == null ? null : this.normalizeDate(this.offer.fechaEnvioOfertaClienteNegociada);
      this.offer.fechaRespuestaCliente == null ? null : this.normalizeDate(this.offer.fechaRespuestaCliente);
      this.offer.fechaRespuestaClienteNegociada == null ? null : this.normalizeDate(this.offer.fechaRespuestaClienteNegociada);
      this.offer.fechaPo == null ? null : this.normalizeDate(this.offer.fechaPo);
      this.offer.fechaEntregaAlmacen == null ? null : this.normalizeDate(this.offer.fechaEntregaAlmacen);
      this.offer.fechaConciliadoCliente == null ? null : this.normalizeDate(this.offer.fechaConciliadoCliente);
      this.offer.fechaEnvioActaSmu == null ? null : this.normalizeDate(this.offer.fechaEnvioActaSmu);
      this.offer.fechaFirmaActaSmu == null ? null : this.normalizeDate(this.offer.fechaFirmaActaSmu);
      this.offer.fechaGrSmu == null ? null : this.normalizeDate(this.offer.fechaGrSmu);
      this.offersService.updateOffer(this.route.snapshot.params.id, this.offer)
        .subscribe(res => {
          this.router.navigate(['/ofertas']);
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Actualización de oferta', error)
              })
    }

  }

}
