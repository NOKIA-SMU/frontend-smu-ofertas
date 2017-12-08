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

@Injectable()

export class RequestsService {

  constructor(private apollo: Apollo) { }

  public getRequests() {
    return this.apollo.watchQuery<any>({ query: queryRequests })
      .valueChanges
  }

  public createRequest(request) {
    request.subsistema = parseInt(request.subsistema)
    let userAuth = JSON.parse(localStorage.getItem('userAuth'))
    const createSolicitud = gql`
      mutation {
        createSolicitud(
          supervisorId: "${request.supervisorId}",
          supervisor: "${request.supervisor}",
          analistaId: "${request.analistaId}",
          analista: "${request.analista}",
          tas: "${request.tas}",
          estacion: ${request.estacion},
          subsistema: ${request.subsistema},
          suministros: [${request.suministros}],
          servicios: [${request.servicios}],
          prioridad: "${request.prioridad}",
          estadoSolicitud: ${request.estadoSolicitud},
          uid: "${userAuth.uid}",
          credential: "${userAuth.token}"
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
    `
    return this.apollo.mutate({
      mutation: createSolicitud,
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
