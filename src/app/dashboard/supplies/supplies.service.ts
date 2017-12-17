import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';
import {
  querySupplies,
  querySuppliesBySubsystem,
  querySuppliesById,
  mutationCreateSupplie,
  mutationUpdateSupplie
} from './supplies.queries'

@Injectable()
export class SuppliesService {

  userAuth: any;

  constructor(private apollo: Apollo) {
    this.userAuth = JSON.parse(localStorage.getItem('userAuth'));
  }

  public getSupplies() {
    return this.apollo.watchQuery<any>({
      query: querySupplies,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public getSupplieById(id: string) {
    return this.apollo.watchQuery<any>({
      query: querySuppliesById,
      variables: {
        pk: id,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public getSuppliesBySubsystem(subsystemId) {
    return this.apollo.watchQuery<any>({
      query: querySuppliesBySubsystem,
      variables: {
        query: subsystemId,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public createSupplie(supplie) {
    return this.apollo.mutate({
      mutation: mutationCreateSupplie,
      variables: {
        nombre: supplie.nombre,
        marca: supplie.marca,
        referencia: supplie.referencia,
        unidad: supplie.unidad,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    })
  }

  public updateSupplie(id, supplie) {
    return this.apollo.mutate({
      mutation: mutationUpdateSupplie,
      variables: {
        pk: id,
        name: supplie.nombre,
        // brand: supplie.marca,
        // reference: supplie.referencia,
        // unity: supplie.unidad,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    })
  }

}
