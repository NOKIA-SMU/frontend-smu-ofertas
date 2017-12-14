import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';

import { queryOfferts } from './offers.queries';

@Injectable()
export class OffersService {

  userAuth: any;

  constructor(private apollo: Apollo) {
    this.userAuth = JSON.parse(localStorage.getItem('userAuth'));
  }

  public getOffers() {
    return this.apollo.watchQuery<any>({
      query: queryOfferts,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

}
