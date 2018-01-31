import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Profile, Role, Permission, RolePermissions } from '../models/auth.models';

declare var $: any;
declare var swal: any;

@Injectable()
export class AdminService {

  // Instance create list Roles
  rolesColSub: AngularFirestoreCollection<RolePermissions>;
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


  public createPermission(permission: Permission) {
    return this.permissionsCol.add(permission)
  }

  public updatePermission(permission: Permission) {
    return this.permissionsCol.doc(permission.id).update(permission)
  }

  public deletePermission(permission: Permission) {
    return this.permissionsCol.doc(permission.id).delete()
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

  public assignColsOfferToRole(roleId, colsOffer: any[]) {
    debugger
    return this.rolesCol.doc(roleId).collection('colsOffer').add({ list: colsOffer })
  }

  public createRole(role: Role) {
    return this.rolesCol.add(role)
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
    // firebase.firestore().collection('profiles')
    //   .where('roles.Analista', '==', true)
    //   .get()
    //   .then(res => {
    //     debugger
    //   })
  }

  getProfilesCustomerManager() {
    this.profilesCol = this.afs.collection<Profile>('profiles', ref => ref.where('roles.Encargado cliente', '==', true) );
    return this.profilesCol.snapshotChanges()
      .map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Profile;
          const id = res.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  public getRoles() {
    this.rolesCol = this.afs.collection<Role>('roles')
    return  this.rolesCol.snapshotChanges()
      .map(actions => {
        return actions.map(res => {
          const data = res.payload.doc.data() as Role;
          const id = res.payload.doc.id;
          return { id, ...data };
        });
      });
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

  public updateProfile(profile: Profile) {
    return this.profilesCol.doc(profile.id).update(profile)
  }

}
