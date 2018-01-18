import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';

import {
  queryOffers,
  queryOfferById,
  updateOferta,
  queryAccessType,
  querySitesType,
  queryNatureServices,
  queryOfferType,
  queryElementType,
  queryModalities,
  queryAcquisitionTypes,
  queryProviders,
  queryTypesClientResponse,
  queryConfirmationsReceived,
  querySubstatesOffer,
  queryStatesOffer,
  deleteOffer
} from './offers.queries';

@Injectable()
export class OffersService {

  userAuth: any;

  constructor(private apollo: Apollo) {
    this.userAuth = JSON.parse(localStorage.getItem('userAuth'));
  }

  // Param

  public getAccessTypes() {
    return this.apollo.watchQuery<any>({
      query: queryAccessType,
      variables: {uid: this.userAuth.uid, credential: this.userAuth.token}
    }).valueChanges
  }

  public getSitesTypes() {
    return this.apollo.watchQuery<any>({
      query: querySitesType,
      variables: {uid: this.userAuth.uid, credential: this.userAuth.token}
    }).valueChanges
  }

  public getNatureServices() {
    return this.apollo.watchQuery<any>({
      query: queryNatureServices,
      variables: {uid: this.userAuth.uid, credential: this.userAuth.token}
    }).valueChanges
  }

  public getOfferTypes() {
    return this.apollo.watchQuery<any>({
      query: queryOfferType,
      variables: {uid: this.userAuth.uid, credential: this.userAuth.token}
    }).valueChanges
  }

  public getElementTypes() {
    return this.apollo.watchQuery<any>({
      query: queryElementType,
      variables: {uid: this.userAuth.uid, credential: this.userAuth.token}
    }).valueChanges
  }

  public getModalities() {
    return this.apollo.watchQuery<any>({
      query: queryModalities,
      variables: {uid: this.userAuth.uid, credential: this.userAuth.token}
    }).valueChanges
  }

  public getAcquisitionTypes() {
    return this.apollo.watchQuery<any>({
      query: queryAcquisitionTypes,
      variables: {uid: this.userAuth.uid, credential: this.userAuth.token}
    }).valueChanges
  }

  public getProviders() {
    return this.apollo.watchQuery<any>({
      query: queryProviders,
      variables: {uid: this.userAuth.uid, credential: this.userAuth.token}
    }).valueChanges
  }

  public getTypesClientResponse() {
    return this.apollo.watchQuery<any>({
      query: queryTypesClientResponse,
      variables: {uid: this.userAuth.uid, credential: this.userAuth.token}
    }).valueChanges
  }

  public getConfirmationsReceived() {
    return this.apollo.watchQuery<any>({
      query: queryConfirmationsReceived,
      variables: {uid: this.userAuth.uid, credential: this.userAuth.token}
    }).valueChanges
  }

  public getSubstatesOffer() {
    return this.apollo.watchQuery<any>({
      query: querySubstatesOffer,
      variables: {uid: this.userAuth.uid, credential: this.userAuth.token}
    }).valueChanges
  }

  public getStatesOffer() {
    return this.apollo.watchQuery<any>({
      query: queryStatesOffer,
      variables: {uid: this.userAuth.uid, credential: this.userAuth.token}
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
    debugger
    return this.apollo.mutate({
      mutation: updateOferta,
      variables: {
        pk: offer.id,
        ordenSuministro: offer.ordenSuministro,
        ordenServicio: offer.ordenServicio,
        tipoAcceso: offer.tipoAcceso,
        tipoSitio: offer.tipoSitio,
        naturalezaServicio: offer.naturalezaServicio,
        descripcionOds: offer.descripcionOds,
        fechaRecibidoOds: offer.fechaRecibidoOds,
        tipoOferta: offer.tipoOferta,
        workOrder: offer.workOrder,
        descripcionTarea: offer.descripcionTarea,
        encargadoCliente: offer.encargadoCliente,
        tipoElemento: offer.tipoElemento,
        fechaEjecucion: offer.fechaEjecucion,
        confirmacionRecibido: offer.confirmacionRecibido,
        comentarioSupervisor: offer.comentarioSupervisor,
        usuario: offer.usuario,
        numeroOferta: offer.numeroOferta,
        modalidad: offer.modalidad,
        precioUnidadProveedor: offer.precioUnidadProveedor,
        precioUnidadVenta: offer.precioUnidadVenta,
        precioUnidadCliente: offer.precioUnidadCliente,
        tipoAdquisicion: offer.tipoAdquisicion,
        proveedor: offer.proveedor,
        tasOfertaAnterior: offer.tasOfertaAnterior,
        fechaDespachoSupervisor: offer.fechaDespachoSupervisor,
        fechaDespachoCompras: offer.fechaDespachoCompras,
        fechaRespuestaCompras: offer.fechaRespuestaCompras,
        fechaEnvioOfertaCliente: offer.fechaEnvioOfertaCliente,
        fechaEnvioOfertaClienteNegociada: offer.fechaEnvioOfertaClienteNegociada,
        fechaRespuestaCliente: offer.fechaRespuestaCliente,
        fechaRespuestaClienteNegociada: offer.fechaRespuestaClienteNegociada,
        tipoRespuestaCliente: offer.tipoRespuestaCliente,
        tipoRespuestaClienteNegociada: offer.tipoRespuestaClienteNegociada,
        po: offer.po,
        fechaPo: offer.fechaPo,
        comentarioAnalista: offer.comentarioAnalista,
        subestadoOferta: offer.subestadoOferta,
        estadoOferta: offer.estadoOferta,
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
      },
      refetchQueries: [
        {
          query: queryOffers,
          variables: {uid: this.userAuth.uid, credential: this.userAuth.token}
        }
      ]
    })
  }

  public deleteOffer(offerId) {
    let id = parseInt(offerId);
    return this.apollo.mutate({
      mutation: deleteOffer,
      variables: {
        pk: id,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      },
      refetchQueries: [{
        query: queryOffers,
        variables: {
          uid: this.userAuth.uid,
          credential: this.userAuth.token
        }
      }]
    })
  }

}
