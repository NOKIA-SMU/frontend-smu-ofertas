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
  profileToAssignRole: Profile;
  showMoreProfile: boolean = false;
  roleSelected: any[] = [];
  regions = [
    'NOROCCIDENTE',
    'SUROCCIDENTE',
    'COSTA'
  ]


  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getProfiles()
      .subscribe(profiles => {
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
    // Clean back selected roles
    for (let i = 0; i < this.roles.length; i++) this.roles[i].checked = false;
    // Get roles from profile
    let defaultRoles = []
    if (profile.roles != undefined) {
      for (let i = 0; i < Object.keys(profile.roles).length; i++) {
        defaultRoles.push(Object.keys(profile.roles)[i])
      }
    }
    // Checked roles
    for (let i = 0; i < defaultRoles.length; i++) {
      for (let j = 0; j < this.roles.length; j++) {
        if (defaultRoles[i] === this.roles[j].name) this.roles[j].checked = true;
      }
    }
    this.showMoreProfile = false;
    this.editState = !this.editState;
    this.profileToEdit = profile;
  }

  showMore(event, profile: Profile) {
    // let defaultRoles = []
    // if (profile.roles != undefined) {
    //   for (let i = 0; i < Object.keys(profile.roles).length; i++) {
    //     defaultRoles.push(Object.keys(profile.roles)[i])
    //   }
    // }
    this.editState = false;
    this.showMoreProfile = !this.showMoreProfile;
    this.profileToEdit = profile;
  }

  selectRole(role: Role) {
    role.checked = !role.checked;
  }

  updateProfile(event, profile: Profile) {
    profile.roles = {};
    let actualRoles = {}
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].checked) actualRoles[this.roles[i].name] = true;
    }
    profile.roles = actualRoles;
    this.adminService.updateProfile(profile)
  }

}
