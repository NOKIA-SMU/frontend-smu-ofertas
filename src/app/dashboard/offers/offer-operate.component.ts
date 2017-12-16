import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffersService } from './offers.service';
import { DatePipe } from '@angular/common';

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
    private router: Router,
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
            solicitudId: res.data.oferta.solicitud.id,
            solicitudSupervisor: res.data.oferta.solicitud.supervisor,
            solicitudEstacionNombre: res.data.oferta.solicitud.estacion.nombre,
            solicitudEstacionRegion: res.data.oferta.solicitud.estacion.region,
            solicitudEstacionDepartamento: res.data.oferta.solicitud.estacion.departamento,
            solicitudEstacionCiudad: res.data.oferta.solicitud.estacion.ciudad,
            suministroId: res.data.oferta.suministro ? res.data.oferta.suministro.id : null,
            suministroNombre: res.data.oferta.suministro ? res.data.oferta.suministro.nombre : null,
            servicioId: res.data.oferta.servicio ? res.data.oferta.servicio.id : null,
            servicioNombre: res.data.oferta.servicio ? res.data.oferta.servicio.nombre : null,
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
    this.offer.fechaEjecucion == null ? null : this.normalizeDate(this.offer.fechaEjecucion);
    this.offer.fechaRecibidoCliente == null ? null : this.normalizeDate(this.offer.fechaRecibidoCliente);
    this.offer.fechaDespachoSupervisor == null ? null : this.normalizeDate(this.offer.fechaDespachoSupervisor);
    this.offer.fechaDespachoCompras == null ? null : this.normalizeDate(this.offer.fechaDespachoCompras);
    this.offer.fechaRespuestaCompras == null ? null : this.normalizeDate(this.offer.fechaRespuestaCompras);
    this.offer.fechaRespuestaCliente == null ? null : this.normalizeDate(this.offer.fechaRespuestaCliente);
    this.offer.fechaEnvioCliente == null ? null : this.normalizeDate(this.offer.fechaEnvioCliente);
    this.offer.fechaPo == null ? null : this.normalizeDate(this.offer.fechaPo);
    this.offer.fechaEntregaAlmacen == null ? null : this.normalizeDate(this.offer.fechaEntregaAlmacen);
    this.offer.fechaConciliadoCliente == null ? null : this.normalizeDate(this.offer.fechaConciliadoCliente);
    this.offer.fechaEnvioActaSmu == null ? null : this.normalizeDate(this.offer.fechaEnvioActaSmu);
    this.offer.fechaFirmaActaSmu == null ? null : this.normalizeDate(this.offer.fechaFirmaActaSmu);
    this.offer.fechaGrSmu == null ? null : this.normalizeDate(this.offer.fechaGrSmu);
    // var abc = {
    //   id: "94",
    //   solicitudId: "72",
    //   solicitudSupervisor: "supervisor uno",
    //   solicitudEstacionNombre: "IEC.VAL.IE MANUEL DOLORES MONDRAGON CARMEN DE BOLIVAR",
    //   solicitudEstacionRegion: "SUROCCIDENTE",
    //   solicitudEstacionDepartamento: "Valle del Cauca",
    //   solicitudEstacionCiudad: "Bolivar",
    //   suministroId: "4",
    //   suministroNombre: "suministro4",
    //   servicioId: null,
    //   servicioNombre: null,
    //   cantidad: 1,
    //   tipoOferta: "SMU",
    //   tarea: "task test  1301",
    //   descripcionTarea: "description 1301",
    //   encargadoCliente: "encargado 1301",
    //   fechaEjecucion: "2017-12-16",
    //   confirmacionRecibido: "SI",
    //   comentarioSupervisor: "comentario supervisor 1301",
    //   subestadoOferta: "PENDIENTE PO",
    //   estadoOferta: "PENDIENTE EJECUCION",
    //   usuario: "daguiheso 1301",
    //   numeroOferta: "1301",
    //   modalidad: "LPU",
    //   precioUnidadProveedor: 123456,
    //   precioTotalProveedor: 123456,
    //   precioUnidadVenta: 654321,
    //   precioTotalVenta: 654321,
    //   precioUnidadCliente: 789,
    //   precioTotalCliente: 987,
    //   margen: 9991301,
    //   tipoAdquisicion: "adquisicion 1301",
    //   fechaRecibidoCliente: "2017-12-17",
    //   fechaDespachoSupervisor: "2017-12-18",
    //   fechaDespachoCompras: "2017-12-19",
    //   fechaRespuestaCompras: "2017-12-20",
    //   fechaEnvioCliente: "2017-12-21",
    //   fechaRespuestaCliente: "2017-12-22",
    //   tipoRespuestaCliente: "APROBADO",
    //   po: "po1301",
    //   fechaPo: "2017-12-27",
    //   comentarioAnalista: "comentario analista 1301",
    //   fechaEntregaAlmacen: "2017-12-28",
    //   comentarioAlmacenista: "comment almacenista 1301",
    //   comentarioCoordinador: "commnet coord 1301",
    //   valorConciliadoCliente: 1301500,
    //   fechaConciliadoCliente: "2017-12-30",
    //   comentarioFacturador: "comment factirador 1301",
    //   fechaEnvioActaSmu: "2017-12-31",
    //   comentarioActa: "comment acta 1301",
    //   fechaFirmaActaSmu: "2018-01-01",
    //   fechaGrSmu: "2017-12-02"
    // }
    // debugger
    this.offersService.updateOffer(this.route.snapshot.params.id, this.offer)
      .subscribe(res => {
        this.router.navigate(['/ofertas']);
      }, error => {
        debugger
      })
  }

}
