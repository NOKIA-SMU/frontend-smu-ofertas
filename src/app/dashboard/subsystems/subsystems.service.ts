import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import {
  querySubsystems,
  mutationCreateSubsystem,
  mutationUpdateSubsystem,
  mutationDeleteSubsystem
} from './subsystems.queries';

@Injectable()

export class SubsystemsService {

  userAuth: any;

  constructor(private apollo: Apollo) {
    this.userAuth = JSON.parse(localStorage.getItem('userAuth'));
  }

  public getSubsystems() {
    return this.apollo.watchQuery<any>({
      query: querySubsystems,
      variables: {
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    }).valueChanges
  }

  public createSubsystem(subsystem) {
    return this.apollo.mutate({
      mutation: mutationCreateSubsystem,
      variables: {
        name: subsystem.nombre,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      },
      refetchQueries: [{
        query: querySubsystems,
        variables: {
          uid: this.userAuth.uid,
          credential: this.userAuth.token
        }
      }]
    })
  }

  public updateSubsystem(subsystem) {
    let id = parseInt(subsystem.id)

    return this.apollo.mutate({
      mutation: mutationUpdateSubsystem,
      variables: {
        pk: id,
        name: subsystem.nombre,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    })
  }

  public deleteSubsystem(subsystemId) {
    let id = parseInt(subsystemId)
    return this.apollo.mutate({
      mutation: mutationDeleteSubsystem,
      variables: {
        pk: id,
        uid: this.userAuth.uid,
        credential: this.userAuth.token
      }
    })
  }
}
