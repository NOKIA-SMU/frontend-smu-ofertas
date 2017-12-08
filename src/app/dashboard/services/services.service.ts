import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';

@Injectable()
export class ServicesService {

  constructor(private apollo: Apollo) { }

  public getServices(subsystemId) {
    const queryServices = gql`
      query {
        servicios(query: "${subsystemId}") {
          id
          nombre
        }
      }
    `;
    return this.apollo.watchQuery<any>({ query: queryServices }).valueChanges
  }

}
