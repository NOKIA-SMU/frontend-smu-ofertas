import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Profile } from '../models/auth.models';

@Injectable()

export class AuthService {

  profilesCollection: AngularFirestoreCollection<Profile>;
  profiles: Observable<Profile[]>;
  user: Observable<Profile>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public router: Router,
    private apollo: Apollo
  ) {
    this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    this.profilesCollection = afs.collection<Profile>('profiles'); // reference
    this.profiles = this.profilesCollection.valueChanges(); // observable of notes data
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<Profile>(`profiles/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      })
  }

  public login(user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  public signIn(user) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  public createUser(user: Profile, id: string) {
    return this.profilesCollection.doc(id).set(user);
  }

  public currentUser() {
    return this.user;
  }

  public logout() {
    localStorage.clear();
    return this.afAuth.auth.signOut();
  }

  public sendToken(uid: string, token: string) {
    const postToken = gql`
      mutation {
        createToken(
          uid: "${uid}",
          credential: "${token}",
        ) {
          token {
            id
            uid
            credential
          }
          status
          __typename
        }
      }
    `;
    return this.apollo.mutate({
      mutation: postToken
    });
  }

  public updateToken(uid: string, token: string) {
    const actualizarToken = gql`
      mutation {
        updateToken(
          uid: "${uid}",
          credential: "${token}",
        ) {
          token {
            uid
            credential
          }
          status
          __typename
        }
      }
    `;
    return this.apollo.mutate({
      mutation: actualizarToken
    })
  }

  public deleteToken(uid: string) {
    const removeToken = gql`
      mutation {
        deleteToken(uid: "${uid}") {
          token {
            uid
          }
          status
          __typename
        }
      }
    `;
    return this.apollo.mutate({
      mutation: removeToken
    });
  }

}


