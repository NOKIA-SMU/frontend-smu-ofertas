import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';

import {
  queryOffers,
  queryOfferById,
  updateOferta,
  queryOfferTypes,
  queryConfirmationsReceived,
  querySubstatesOffer,
  queryStatesOffer,
  queryModalities,
  queryTypesClientResponse
} from './offers.queries';

@Injectable()
export class OffersService {

  userAuth: any;

  constructor(private apollo: Apollo) {
    this.userAuth = JSON.parse(localStorage.getItem('userAuth'));
  }

  // Params
  public getOfferTypes() {
    return this.apollo.watchQuery<any>({
      query: queryOfferTypes,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public getConfirmationsReceived() {
    return this.apollo.watchQuery<any>({
      query: queryConfirmationsReceived,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public getSubstatesOffer() {
    return this.apollo.watchQuery<any>({
      query: querySubstatesOffer,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public getStatesOffer() {
    return this.apollo.watchQuery<any>({
      query: queryStatesOffer,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public getModalities() {
    return this.apollo.watchQuery<any>({
      query: queryModalities,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public getTypesClientResponse() {
    return this.apollo.watchQuery<any>({
      query: queryTypesClientResponse,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }





  public getOffers() {
    return this.apollo.watchQuery<any>({
      query: queryOffers,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public getOfferById(id: string) {
    return this.apollo.watchQuery<any>({
      query: queryOfferById,
      variables: {
        pk: id,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public updateOffer(id, offer) {
    return this.apollo.mutate({
      mutation: updateOferta,
      variables: {
        pk: offer.id,
        solicitud: offer.solicitudId,
        suministro: offer.suministroId,
        servicio: offer.servicioId,
        cantidad: offer.cantidad,
        tipoOferta: offer.tipoOferta,
        tarea: offer.tarea,
        descripcionTarea: offer.descripcionTarea,
        encargadoCliente: offer.encargadoCliente,
        fechaEjecucion: offer.fechaEjecucion,
        confirmacionRecibido: offer.confirmacionRecibido,
        comentarioSupervisor: offer.comentarioSupervisor,
        subestadoOferta: offer.subestadoOferta,
        estadoOferta: offer.estadoOferta,
        usuario: offer.usuario,
        numeroOferta: offer.numeroOferta,
        modalidad: offer.modalidad,
        precioUnidadProveedor: offer.precioUnidadProveedor,
        precioTotalProveedor: offer.precioTotalProveedor,
        precioUnidadVenta: offer.precioUnidadVenta,
        precioTotalVenta: offer.precioTotalVenta,
        precioUnidadCliente: offer.precioUnidadCliente,
        precioTotalCliente: offer.precioTotalCliente,
        margen: offer.margen,
        tipoAdquisicion: offer.tipoAdquisicion,
        fechaRecibidoCliente: offer.fechaRecibidoCliente,
        fechaDespachoSupervisor: offer.fechaDespachoSupervisor,
        fechaDespachoCompras: offer.fechaDespachoCompras,
        fechaRespuestaCompras: offer.fechaRespuestaCompras,
        fechaEnvioCliente: offer.fechaEnvioCliente,
        fechaRespuestaCliente: offer.fechaRespuestaCliente,
        tipoRespuestaCliente: offer.tipoRespuestaCliente,
        po: offer.po,
        fechaPo: offer.fechaPo,
        comentarioAnalista: offer.comentarioAnalista,
        fechaEntregaAlmacen: offer.fechaEntregaAlmacen,
        comentarioAlmacenista: offer.comentarioAlmacenista,
        comentarioCoordinador: offer.comentarioCoordinador,
        valorConciliadoCliente: offer.valorConciliadoCliente,
        fechaConciliadoCliente: offer.fechaConciliadoCliente,
        comentarioFacturador: offer.comentarioFacturador,
        fechaEnvioActaSmu: offer.fechaEnvioActaSmu,
        comentarioActa: offer.comentarioActa,
        fechaFirmaActaSmu: offer.fechaFirmaActaSmu,
        fechaGrSmu: offer.fechaGrSmu,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    })
  }

}
