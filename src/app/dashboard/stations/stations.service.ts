import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';

const queryStations = gql`
  query queryStations {
    estaciones {
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

@Injectable()

export class StationsService {

  constructor(private apollo: Apollo) { }

  public getStations() {
    return this.apollo.watchQuery<any>({ query: queryStations })
      .valueChanges
  }

  public updateStation(station) {
    let id = parseInt(station.id)
    let latitud = parseFloat(station.latitud)
    let longitud = parseFloat(station.longitud)
    let updateEstacion = gql`
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

}
