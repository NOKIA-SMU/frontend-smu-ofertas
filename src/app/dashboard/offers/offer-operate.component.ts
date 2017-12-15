import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffersService } from './offers.service';

@Component({
  selector: 'app-offer-operate',
  templateUrl: './offer-operate.component.html',
  styleUrls: ['../dashboard.component.scss', './offers.component.scss']
})

export class OfferOperateComponent implements OnInit {

  isNew: boolean;
  offer: any;

  offerTypes: string[];
  confirmationsReceived: string[];
  substatesOffer: string[];
  statesOffer: string[];
  modalities: string[];
  typesClientResponse: string[];

  constructor(
    private route: ActivatedRoute,
    private offersService: OffersService
  ) {
    this.offersService.getOfferTypes()
      .subscribe(res => {
        this.offerTypes = res.data.tipoOfertas;
      }, error => {
        debugger
      })

    this.offersService.getConfirmationsReceived()
      .subscribe(res => {
        this.confirmationsReceived = res.data.confirmacionRecibido;
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

    this.offersService.getModalities()
      .subscribe(res => {
        this.modalities = res.data.modalidad;
      }, error => {
        debugger
      })

    this.offersService.getTypesClientResponse()
      .subscribe(res => {
        this.typesClientResponse = res.data.tipoRespuestaCliente;
      }, error => {
        debugger
      })
  }

  ngOnInit() {
    if (this.route.snapshot.params.id != 'crear') {
      this.isNew = false;
      this.offersService.getOfferById(this.route.snapshot.params.id)
        .subscribe(res => {
          this.offer = {
            id: res.data.oferta.id,
            cantidad: res.data.oferta.cantidad,
            tipoOferta: res.data.oferta.tipoOferta,
            tarea: res.data.oferta.tarea,
            descripcionTarea: res.data.oferta.descripcionTarea,
            encargadoCliente: res.data.oferta.encargadoCliente,
            fechaEjecucion: res.data.oferta.fechaEjecucion,
            confirmacionRecibido: res.data.oferta.confirmacionRecibido,
            comentarioSupervisor: res.data.oferta.comentarioSupervisor,
            subestadoOferta: res.data.oferta.subestadoOferta,
            estadoOferta: res.data.oferta.estadoOferta,
            usuario: res.data.oferta.usuario,
            numeroOferta: res.data.oferta.numeroOferta,
            modalidad: res.data.oferta.modalidad,
            precioUnidadProveedor: res.data.oferta.precioUnidadProveedor,
            precioTotalProveedor: res.data.oferta.precioTotalProveedor,
            precioUnidadVenta: res.data.oferta.precioUnidadVenta,
            precioTotalVenta: res.data.oferta.precioTotalVenta,
            precioUnidadCliente: res.data.oferta.precioUnidadCliente,
            precioTotalCliente: res.data.oferta.precioTotalCliente,
            margen: res.data.oferta.margen,
            tipoAdquisicion: res.data.oferta.tipoAdquisicion,
            fechaRecibidoCliente: res.data.oferta.fechaRecibidoCliente,
            fechaDespachoSupervisor: res.data.oferta.fechaDespachoSupervisor,
            fechaDespachoCompras: res.data.oferta.fechaDespachoCompras,
            fechaRespuestaCompras: res.data.oferta.fechaRespuestaCompras,
            fechaEnvioCliente: res.data.oferta.fechaEnvioCliente,
            fechaRespuestaCliente: res.data.oferta.fechaRespuestaCliente,
            tipoRespuestaCliente: res.data.oferta.tipoRespuestaCliente,
            po: res.data.oferta.po,
            fechaPo: res.data.oferta.fechaPo,
            comentarioAnalista: res.data.oferta.comentarioAnalista,
            fechaEntregaAlmacen: res.data.oferta.fechaEntregaAlmacen,
            comentarioAlmacenista: res.data.oferta.comentarioAlmacenista,
            comentarioCoordinador: res.data.oferta.comentarioCoordinador,
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
    } else {
      this.offer = {
        cantidad: null,
        tipoOferta: null,
        tarea: null,
        descripcionTarea: null,
        encargadoCliente: null,
        fechaEjecucion: null,
        confirmacionRecibido: null,
        comentarioSupervisor: null,
        subestadoOferta: null,
        estadoOferta: null,
        usuario: null,
        numeroOferta: null,
        modalidad: null,
        precioUnidadProveedor: null,
        precioTotalProveedor: null,
        precioUnidadVenta: null,
        precioTotalVenta: null,
        precioUnidadCliente: null,
        precioTotalCliente: null,
        margen: null,
        tipoAdquisicion: null,
        fechaRecibidoCliente: null,
        fechaDespachoSupervisor: null,
        fechaDespachoCompras: null,
        fechaRespuestaCompras: null,
        fechaEnvioCliente: null,
        fechaRespuestaCliente: null,
        tipoRespuestaCliente: null,
        po: null,
        fechaPo: null,
        comentarioAnalista: null,
        fechaEntregaAlmacen: null,
        comentarioAlmacenista: null,
        comentarioCoordinador: null,
        valorConciliadoCliente: null,
        fechaConciliadoCliente: null,
        comentarioFacturador: null,
        fechaEnvioActaSmu: null,
        comentarioActa: null,
        fechaFirmaActaSmu: null,
        fechaGrSmu: null
      }
      this.isNew = true;
    }

  }

  saveOffert() {
    debugger
  }

}
