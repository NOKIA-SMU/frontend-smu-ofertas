import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';

const queryOfertas = gql`
  {
    ofertas {
      id
      solicitud {
        id
        analista
      }
      suministro {
        id
        nombre
      }
      servicio {
        id
        nombre
      }
      estadoOferta
      subestadoOferta
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
