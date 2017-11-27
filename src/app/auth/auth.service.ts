import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Profile } from '../models/auth.models';

@Injectable()

export class AuthService {

  profilesCollection: AngularFirestoreCollection<Profile>;
  profiles: Observable<Profile[]>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.profilesCollection = afs.collection<Profile>('profiles'); // reference
    this.profiles = this.profilesCollection.valueChanges(); // observable of notes data
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

}


