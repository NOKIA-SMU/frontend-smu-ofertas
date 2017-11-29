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
export class DashboardService {

  constructor(private apollo: Apollo) { }

  public getStations() {
    return this.apollo.watchQuery<any>({ query: queryStations })
      .valueChanges
  }

}
