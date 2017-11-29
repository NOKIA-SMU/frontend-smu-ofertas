import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Profile } from '../models/auth.models';

@Injectable()

export class AuthService {

  profilesCollection: AngularFirestoreCollection<Profile>;
  profiles: Observable<Profile[]>;
  user: Observable<Profile>;
  currentUser: any;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public router: Router
  ) {
    this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    this.profilesCollection = afs.collection<Profile>('profiles'); // reference
    this.profiles = this.profilesCollection.valueChanges(); // observable of notes data
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<Profile>(`profiles/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
      })
  }

  public login(user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  public signIn(user) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  public createUser(user: Profile) {
    return this.profilesCollection.add(user)
  }

  public isUserAuthenticated() {
    return this.afAuth.auth.currentUser;
    // return this.isAuth =  firebase.auth().onAuthStateChanged(res => {
    //   debugger
    // }, error => {
    //   debugger
    // })
  }

}


