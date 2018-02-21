import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';
import {
  querySupplies,
  querySuppliesBySubsystem,
  querySuppliesById,
  mutationCreateSupplie,
  mutationUpdateSupplie,
  deleteSupplie
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
        codigoLpu: supplie.codigoLpu,
        codigoMm: supplie.codigoMm,
        nombre: supplie.nombre,
        descripcion: supplie.descripcion,
        marca: supplie.marca,
        referencia: supplie.referencia,
        subsistema: supplie.subsistema,
        unidad: supplie.unidad,
        valorLpu: supplie.valorLpu,
        descripcionLpu: supplie.descripcionLpu,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      },
      refetchQueries: [{
        query: querySupplies,
        variables: { uid: this.userAuth.uid, credential: this.userAuth.token }
      }]
    })
  }

  public updateSupplie(id, supplie) {
    return this.apollo.mutate({
      mutation: mutationUpdateSupplie,
      variables: {
        pk: id,
        codigoLpu: supplie.codigoLpu,
        codigoMm: supplie.codigoMm,
        nombre: supplie.nombre,
        descripcion: supplie.descripcion,
        marca: supplie.marca,
        referencia: supplie.referencia,
        subsistema: supplie.subsistema,
        unidad: supplie.unidad,
        valorLpu: supplie.valorLpu,
        descripcionLpu: supplie.descripcionLpu,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      },
      refetchQueries: [{
        query: querySupplies,
        variables: { uid: this.userAuth.uid, credential: this.userAuth.token }
      }]
    })
  }

  public deleteSupplie(supplieId) {
    let id = parseInt(supplieId);
    return this.apollo.mutate({
      mutation: deleteSupplie,
      variables: {
        pk: id,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      },
      refetchQueries: [{
        query: querySupplies,
        variables: {
          uid: this.userAuth.uid,
          credential: this.userAuth.token
        }
      }]
    })
  }

}
