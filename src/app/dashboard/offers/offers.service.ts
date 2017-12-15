import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';

import {
  queryOfferts,
  queryOfferById,
  queryOfferTypes,
  queryConfirmationsReceived,
  querySubstatesOffer,
  queryStatesOffer,
  queryModalities,
  queryTypesClientResponse
} from './offers.queries';

@Injectable()
export class OffersService {

  userAuth: any;

  constructor(private apollo: Apollo) {
    this.userAuth = JSON.parse(localStorage.getItem('userAuth'));
  }

  // Params
  public getOfferTypes() {
    return this.apollo.watchQuery<any>({
      query: queryOfferTypes,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public getConfirmationsReceived() {
    return this.apollo.watchQuery<any>({
      query: queryConfirmationsReceived,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public getSubstatesOffer() {
    return this.apollo.watchQuery<any>({
      query: querySubstatesOffer,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public getStatesOffer() {
    return this.apollo.watchQuery<any>({
      query: queryStatesOffer,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public getModalities() {
    return this.apollo.watchQuery<any>({
      query: queryModalities,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public getTypesClientResponse() {
    return this.apollo.watchQuery<any>({
      query: queryTypesClientResponse,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
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

  public getOfferById(id: string) {
    return this.apollo.watchQuery<any>({
      query: queryOfferById,
      variables: {
        pk: id,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

}
