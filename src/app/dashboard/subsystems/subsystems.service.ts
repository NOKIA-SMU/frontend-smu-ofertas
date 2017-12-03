import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';

const querySubsystems = gql`
  query {
    subsistemas {
      id
      nombre
    }
  }
`;

@Injectable()
export class SubsystemsService {

  constructor(private apollo: Apollo) { }

  public getSubsystems() {
    return this.apollo.watchQuery<any>({ query: querySubsystems })
      .valueChanges
  }

  public createSubsystem(subsystem) {
    const createSubsistema = gql`
      mutation {
        createSubsistema(
          nombre: "${subsystem.nombre}"
        ) {
          subsistema {
            id
            nombre
          }
        }
      }
    `;
    return this.apollo.mutate({
      mutation: createSubsistema,
      refetchQueries: [{
        query: querySubsystems
      }]
    })

  }

  public updateSubsystem(subsystem) {
    let id = parseInt(subsystem.id)
    const updateSubsistema = gql`
      mutation {
        updateSubsistema(
          id:  ${id},
          nombre: "${subsystem.nombre}",
        ) {
          subsistema {
            id
            nombre
          }
        }
      }
    `
    return this.apollo.mutate({ mutation: updateSubsistema })
  }

  public deleteSubsystem(subsystemId) {
    let id = parseInt(subsystemId)
    const deleteSubsistema = gql`
    mutation {
      deleteSubsistema(id: ${id}) {
        subsistema {
          id
          nombre
        }
      }
    }
    `
    return this.apollo.mutate({ mutation: deleteSubsistema })
  }

}
