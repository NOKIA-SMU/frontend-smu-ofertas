import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs/Observable";
import gql from 'graphql-tag';

import {
  queryStations,
  mutationCreateStation,
  mutationUpdateStation,
  mutationDeleteStation
} from './stations.queries'


@Injectable()

export class StationsService {

  userAuth: any;

  constructor(private apollo: Apollo) {
    this.userAuth = JSON.parse(localStorage.getItem('userAuth'));
  }

  public getStations(filter) {
    return this.apollo.watchQuery<any>({
      query: queryStations,
      variables: {
        query: filter,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public createStation(station) {
    return this.apollo.mutate({
      mutation: mutationCreateStation,
      refetchQueries: [{
        query: queryStations,
        variables: {
          name: station.nombre,
          ubication: station.ubicacion,
          region: station.region,
          departament: station.departamento,
          city: station.ciudad,
          address: station.direccion,
          lat: station.latitud,
          lon: station.longitud,
          estructure: station.estructura,
          category: station.categoria,
          uid: this.userAuth.uid,
          credential: this.userAuth.token
        }
      }]
    })
  }

  public updateStation(station) {
    let id = parseInt(station.id)
    let latitud = parseFloat(station.latitud)
    let longitud = parseFloat(station.longitud)

    return this.apollo.mutate({
      mutation: mutationUpdateStation,
      variables: {
        pk: station.id,
        name: station.nombre,
        ubication: station.ubicacion,
        region: station.region,
        departament: station.departamento,
        city: station.ciudad,
        address: station.direccion,
        lat: station.latitud,
        lon: station.longitud,
        structure: station.estructura,
        category: station.categoria,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    })
  }

  public deleteStation(stationId) {
    let id = parseInt(stationId)
    return this.apollo.mutate({
      mutation: mutationDeleteStation,
      variables: {
        pk: id,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    })
  }

}
