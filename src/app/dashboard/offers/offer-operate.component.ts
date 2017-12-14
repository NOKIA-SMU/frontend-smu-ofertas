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

  constructor(
    private route: ActivatedRoute,
    private offersService: OffersService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params.id != 'crear') {
      this.isNew = false;
      this.offersService.getOfferById(this.route.snapshot.params.id)
        .subscribe(res => {
          // debugger
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
            percioUnidadProveedor: res.data.oferta.percioUnidadProveedor,
            percioTotalProveedor: res.data.oferta.percioTotalProveedor,
            percioUnidadVenta: res.data.oferta.percioUnidadVenta,
            percioTotalVenta: res.data.oferta.percioTotalVenta,
            percioUnidadCliente: res.data.oferta.percioUnidadCliente,
            percioTotalCliente: res.data.oferta.percioTotalCliente,
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
            fechaEntrgaAlmacen: res.data.oferta.fechaEntrgaAlmacen,
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

        })
    } else {
      // this.station = {
      //   id: null,
      //   nombre: '',
      //   ubicacion: '',
      //   region: '',
      //   departamento: '',
      //   ciudad: '',
      //   direccion: '',
      //   latitud: null,
      //   longitud: null,
      //   estructura: '',
      //   categoria: ''
      // }
      this.isNew = true;
    }

  }

  saveOffert() {
    debugger
  }

}
