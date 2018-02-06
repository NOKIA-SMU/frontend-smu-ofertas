import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Profile, Role, Permission, RolePermissions, RoleColsOffer } from '../models/auth.models';

declare var $: any;
declare var swal: any;

@Injectable()
export class AdminService {

  // Instance create list Roles
  rolesColSub: AngularFirestoreCollection<RolePermissions>;
  rolesColsOffer: AngularFirestoreCollection<RoleColsOffer>;
  rolesCol: AngularFirestoreCollection<Role>;
  roles: Observable<Role[]>;
  rolesDoc: AngularFirestoreDocument<Role>;
  // Instance create list Permissions
  permissionsCol: AngularFirestoreCollection<Permission>;
  permissions: Observable<Permission[]>;
  // rolePermissions: Observable<Permission[]>;

  profilesCol: AngularFirestoreCollection<Profile>;
  profiles: Observable<Profile[]>;
  profilesDoc: AngularFirestoreDocument<Profile>;

  role: Observable<any[]>;

  constructor(private afs: AngularFirestore) { }

  // Permissions
  public createPermission(permission: Permission) {
    return this.permissionsCol.add(permission)
  }

  public getPermissions() {
    this.permissionsCol = this.afs.collection<Permission>('permissions')
    return this.permissionsCol.snapshotChanges()
      .map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Permission;
          const id = res.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  public updatePermission(permission: Permission) {
    return this.permissionsCol.doc(permission.id).update(permission)
  }

  public deletePermission(permission: Permission) {
    return this.permissionsCol.doc(permission.id).delete()
  }

  public getRolePermissions(role: Role) {
    this.rolesColSub = this.afs.collection('roles').doc(role.id).collection<RolePermissions>('permissions');
    return this.rolesColSub.snapshotChanges()
      .map(actions => {
        return actions
          .map(res => {
            const data = res.payload.doc.data() as RolePermissions;
            const id = res.payload.doc.id;
            return { id, ...data };
          });
      });
  }

  // Roles
  public createRole(role: Role) {
    return this.rolesCol.add(role)
  }

  public getRoles() {
    this.rolesCol = this.afs.collection<Role>('roles')
    return this.rolesCol.snapshotChanges()
      .map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Role;
          const id = res.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  public deleteRole(role: Role) {
    return this.rolesCol.doc(role.id).delete()
  }
  public updateRole(role: Role) {
    return this.rolesCol.doc(role.id).update(role)
  }

  public assignPermissionToRole(roleId, permissions: Permission[]) {
    return this.rolesCol.doc(roleId).collection('permissions').add({ list: permissions })
  }

  public updatePermissionsToRole(roleId, colPermissionsId: string, permissions: Permission[]) {
    return this.rolesCol.doc(roleId).collection('permissions').doc(colPermissionsId).update({ list: permissions })
  }

  public assignColsOfferToRole(roleId, colsOfferSelected: any[]) {
    return this.rolesCol.doc(roleId).collection('colsOffer').add({ list: colsOfferSelected })
  }

  public updateColsOfferToRole(roleId, colOffersId: string, colsOfferSelected: any[]) {
    return this.rolesCol.doc(roleId).collection('colsOffer').doc(colOffersId).update({ list: colsOfferSelected })
  }

  public getColsOfferRole(role: Role) {
    this.rolesColsOffer = this.afs.collection('roles').doc(role.id).collection<RoleColsOffer>('colsOffer');
    return this.rolesColsOffer.snapshotChanges()
      .map(actions => {
        return actions
          .map(res => {
            const data = res.payload.doc.data() as RoleColsOffer;
            const id = res.payload.doc.id;
            return { id, ...data };
          });
      });
  }

  // Profiles
  public getProfiles() {
    this.profilesCol = this.afs.collection<Profile>('profiles');
    return this.profilesCol.snapshotChanges()
    .map(actions => {
      return actions.map(res => {
        const data = res.payload.doc.data() as Profile;
        const id = res.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  getProfilesAnalysts() {
    this.profilesCol = this.afs.collection<Profile>('profiles', ref => ref.where('roles.Analista', '==', true) );
    return this.profilesCol.snapshotChanges()
      .map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Profile;
          const id = res.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  getProfilesCustomerManager() {
    this.profilesCol = this.afs.collection<Profile>('profiles', ref => ref.where('roles.Encargado Cliente', '==', true) );
    return this.profilesCol.snapshotChanges()
      .map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Profile;
          const id = res.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  public updateProfile(profile: Profile) {
    return this.profilesCol.doc(profile.id).update(profile)
  }

  public deleteProfile(profile: Profile) {
    return this.profilesCol.doc(profile.id).delete()
  }

}
