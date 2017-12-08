import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';

@Injectable()

export class StationsService {

  constructor(private apollo: Apollo) { }

  public getStations(filter) {
    const queryStations = gql`
      query {
        estaciones(query: "${filter}") {
          id
          nombre
          ubicacion
          region
          departamento
          ciudad
          direccion
          latitud
          longitud
          estructura
          categoria
          estado
          subestado
          creado
          actualizado
        }
      }
    `;
    return this.apollo.watchQuery<any>({ query: queryStations }).valueChanges
  }

  public createStation(station) {
    const createEstacion = gql`
      mutation {
        createEstacion(
          nombre: "${station.nombre}",
          ubicacion: "${station.ubicacion}",
          region: "${station.region}",
          departamento: "${station.departamento}",
          ciudad: "${station.ciudad}",
          direccion: "${station.direccion}",
          latitud: ${station.latitud},
          longitud: ${station.longitud},
          estructura: "${station.estructura}",
          categoria: "${station.categoria}",
        ) {
          estacion {
            id
            nombre
            ubicacion
            region
            departamento
            ciudad
            direccion
            latitud
            longitud
            estructura
            categoria
          }
        }
      }
    `
    return this.apollo.mutate({
      mutation: createEstacion,
      refetchQueries: [{
        query: queryStations
      }]
    })
  }

  public updateStation(station) {
    let id = parseInt(station.id)
    let latitud = parseFloat(station.latitud)
    let longitud = parseFloat(station.longitud)
    const updateEstacion = gql`
      mutation {
        updateEstacion(
          id: ${id},
          nombre: "${station.nombre}",
          ubicacion: "${station.ubicacion}",
          region: "${station.region}",
          departamento: "${station.departamento}",
          ciudad: "${station.ciudad}",
          direccion: "${station.direccion}",
          latitud: ${latitud},
          longitud: ${longitud},
          estructura: "${station.estructura}",
          categoria: "${station.categoria}",
        ) {
          estacion {
            id
            nombre
            ubicacion
            region
            departamento
            ciudad
            direccion
            latitud
            longitud
            estructura
            categoria
          }
          status
        }
      }
    `
    return this.apollo.mutate({ mutation: updateEstacion })
  }

  public deleteStation(stationId) {
    let id = parseInt(stationId)
    const deleteEstacion = gql`
    mutation {
      deleteEstacion(id: ${id}) {
        estacion {
          id
        }
      }
    }
    `
    return this.apollo.mutate({ mutation: deleteEstacion })
  }

}
