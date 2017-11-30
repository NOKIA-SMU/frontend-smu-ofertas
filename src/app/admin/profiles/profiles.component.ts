import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Profile, Role, Permission } from '../../models/auth.models';


@Component({
  selector: 'admin-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['../admin.component.scss']
})
export class ProfilesComponent implements OnInit {

  loadingProfiles = true;
  profiles: Profile[];
  roles: Role[];
  editState: boolean = false;
  profileToEdit: Profile;
  isShowEditRole: boolean = false;
  profileToAssignRole: Profile;
  showMoreProfile: boolean = false;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getProfiles().subscribe(profiles => {
      this.loadingProfiles = false;
      this.profiles = profiles;
    }, error => {

    });

    this.adminService.getRoles().subscribe(roles => {
      this.roles = roles;
    }, error => {

    });
  }

  editProfile(event, profile: Profile) {
    this.editState = !this.editState;
    this.profileToEdit = profile;
  }

  showMore(event, profile: Profile) {
    this.showMoreProfile = !this.showMoreProfile;
    this.profileToEdit = profile;
  }

  showEditRole(event, profile: Profile) {
    this.isShowEditRole = !this.isShowEditRole;
    this.profileToAssignRole = profile;
  }

  assignRoleToProfile(role: Role, profile: Profile) {
    this.adminService.assignRoleToProfile(role, profile)
      .then(res => {
        debugger
      },
      error => {
        debugger
      })
  }

  updateProfile(event, profile) {
    this.adminService.updateProfile(profile)
  }

}
