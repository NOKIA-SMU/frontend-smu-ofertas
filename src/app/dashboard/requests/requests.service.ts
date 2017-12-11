import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';

import { createSolicitud, queryRequests, deleteSolicitud, updateSolicitud, queryPriorities } from './requests.queries';

@Injectable()
export class RequestsService {

  userAuth: any;

  constructor(private apollo: Apollo) {
    this.userAuth = JSON.parse(localStorage.getItem('userAuth'))
  }

  public getPriorities() {
    return this.apollo.watchQuery<any>({
      query: queryPriorities,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public getRequests() {
    return this.apollo.watchQuery<any>({
      query: queryRequests,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public createRequest(request) {
    request.subsistema = parseInt(request.subsistema)
    let userAuth = JSON.parse(localStorage.getItem('userAuth'))

    return this.apollo.mutate({
      mutation: createSolicitud,
      variables: {
        supervisorId: request.supervisorId,
        supervisor: request.supervisor,
        analistaId: request.analistaId,
        analista: request.analista,
        tas: request.tas,
        estacion: request.estacion,
        subsistema: request.subsistema,
        suministros: request.suministros,
        servicios: request.servicios,
        prioridad: request.prioridad,
        estadoSolicitud: request.estadoSolicitud,
        uid: userAuth.uid,
        credential: userAuth.token
      },
      refetchQueries: [{
        query: queryRequests
      }]
    })
  }

  public updateRequest(request) {
    let userAuth = JSON.parse(localStorage.getItem('userAuth'))
    return this.apollo.mutate({
      mutation: updateSolicitud,
      variables: {
        supervisorId: request.supervisorId,
        supervisor: request.supervisor,
        analistaId: request.analistaId,
        analista: request.analista,
        tas: request.tas,
        estacion: request.estacion,
        subsistema: request.subsistema,
        suministros: request.suministros,
        servicios: request.servicios,
        prioridad: request.prioridad,
        estadoSolicitud: request.estadoSolicitud,
        uid: userAuth.uid,
        credential: userAuth.token
      }
    })
  }

  public deleteRequest(requestId) {
    let id = parseInt(requestId)
    return this.apollo.mutate({ mutation: deleteSolicitud })
  }

}
