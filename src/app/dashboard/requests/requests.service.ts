import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';

const queryRequests = gql`
  query {
    solicitudes {
      id
      supervisorId
      supervisor
      analistaId
      analista
      tas
      estacion {
        id
        nombre
      }
      subsistema {
        id
        nombre
      }
      suministros {
        id
        nombre
      }
      servicios {
        id
        nombre
      }
      prioridad
      estadoSolicitud
    }
  }
`;

const createSolicitud = gql`
  mutation (
    $supervisorId: String,
    $supervisor: String,
    $analistaId: String,
    $analista: String,
    $tas: String,
    $estacion: ID,
    $subsistema: ID,
    $suministros: [SuministroInput],
    $servicios: [ServicioInput],
    $prioridad: String,
    $estadoSolicitud: Boolean,
    $uid: String,
    $credential: String,
  ){
    createSolicitud(
      supervisorId: $supervisorId,
      supervisor: $supervisor,
      analistaId: $analistaId,
      analista: $analista,
      tas: $tas,
      estacion: $estacion,
      subsistema: $subsistema,
      suministros: $suministros,
      servicios: $servicios,
      prioridad: $prioridad,
      estadoSolicitud: $estadoSolicitud,
      uid: $uid,
      credential: $credential
    ) {
      solicitud {
        id
        supervisorId
        supervisor
        analistaId
        analista
        tas
        estacion {
          id
        }
        subsistema {
          id
        }
        suministros {
          id
        }
        servicios {
          id
        }
        prioridad
        estadoSolicitud
      }
      status
    }
  }
`;

@Injectable()
export class RequestsService {

  constructor(private apollo: Apollo) { }

  public getRequests() {
    return this.apollo.watchQuery<any>({ query: queryRequests })
      .valueChanges
  }

  public createRequest(request) {
    const supplies = []
    const services = []
    if (request.suministros.length > 0) {
      for (let i = 0; i < request.suministros.length; i++) {
        request.suministros[i].id = parseInt(request.suministros[i].id);
        supplies.push({ suministroId: request.suministros[i].id, suministroQty: request.suministros[i].qty })
      }
    }
    if (request.servicios.length > 0) {
      for (let i = 0; i < request.services.length; i++) {
        request.services[i].id = parseInt(request.services[i].id);
        supplies.push({servicioId: request.services[i].id, servicioQty: request.services[i].qty })
      }
    }
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
        suministros: supplies,
        servicios: services,
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
    let id = parseInt(request.id)
    const updateSolicitud = gql`
      mutation {
        updateSolicitud(
          id: ID,
          supervisor: " ",
          analista: " ",
          tas: " ",
          estacion: ID,
          subsistema: ID,
          suministros: [ID],
          servicios: [ID],
          prioridad: " ",
          estadoSolicitud: BOOLEAN,
        ) {
          solicitud {
            id
            supervisor
            analista
            tas
            estacion {
              id
            }
            subsistema {
              id
            }
            suministros {
              id
            }
            servicios {
              id
            }
            prioridad
            estadoSolicitud
          }
          status
        }
      }
    `
    return this.apollo.mutate({ mutation: updateSolicitud })
  }

  public deleteRequest(requestId) {
    let id = parseInt(requestId)
    const deleteSolicitud = gql`
      mutation {
        deleteSolicitud(id: ${id}) {
          estacion {
            id
          }
          status
        }
      }
    `
    return this.apollo.mutate({ mutation: deleteSolicitud })
  }

}
