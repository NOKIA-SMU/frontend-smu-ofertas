import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';

import { createSolicitud, queryRequests, deleteSolicitud, updateSolicitud, queryPriorities, queryRequestById } from './requests.queries';
import { queryOffers } from "../offers/offers.queries";

@Injectable()
export class RequestsService {

  userAuth: any;

  constructor(private apollo: Apollo) {
    this.userAuth = JSON.parse(localStorage.getItem('userAuth'));
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
    var userAuth = JSON.parse(localStorage.getItem('userAuth'))
    return this.apollo.watchQuery<any>({
      query: queryRequests,
      variables: {
        uid: userAuth.uid,
        credential: userAuth.token
      }
    }).valueChanges
  }

  public getRequestById(id: string) {
    return this.apollo.watchQuery<any>({
      query: queryRequestById,
      variables: {
        pk: id,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public createRequest(request) {
    request.subsistema = parseInt(request.subsistema)

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
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      },
      refetchQueries: [
        {
          query: queryRequests,
          variables: {
            uid: this.userAuth.uid,
            credential: this.userAuth.token
          }
        },
        {
          query: queryOffers,
          variables: {
            uid: this.userAuth.uid,
            credential: this.userAuth.token
          }
        }
      ]
    })
  }

  public updateRequest(id, request) {
    return this.apollo.mutate({
      mutation: updateSolicitud,
      variables: {
        pk: id,
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
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      },
      refetchQueries: [
        {
          query: queryOffers,
          variables: {
            uid: this.userAuth.uid,
            credential: this.userAuth.token
          }
        }
      ]
    })
  }

  public deleteRequest(requestId) {
    let id = parseInt(requestId)
    return this.apollo.mutate({
      mutation: deleteSolicitud,
      variables: {
        pk: id,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      },
      refetchQueries: [{
        query: queryRequests,
        variables: {
          uid: this.userAuth.uid,
          credential: this.userAuth.token
        }
      }]
    })
  }

}
