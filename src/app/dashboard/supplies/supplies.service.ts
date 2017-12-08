import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';

@Injectable()
export class SuppliesService {

  constructor(private apollo: Apollo) { }

  public getSupplies(subsystemId) {
    const querySupplies = gql`
      query {
        suministros(query: "${subsystemId}") {
          id
          nombre
        }
      }
    `;
    return this.apollo.watchQuery<any>({ query: querySupplies }).valueChanges
  }

}
