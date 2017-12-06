import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';

const queryOfertas = gql`
  {
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
export class OffersService {

  constructor(private apollo: Apollo) { }

  public getOffers() {
    return this.apollo.watchQuery<any>({ query: queryOfertas })
      .valueChanges
  }

}
