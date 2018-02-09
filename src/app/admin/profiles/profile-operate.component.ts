import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile, Role } from '../../models/auth.models';
import { AdminService } from '../admin.service';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-profile-operate',
  templateUrl: './profile-operate.component.html',
  styleUrls: ['../admin.component.scss','./profiles.component.scss']
})

export class ProfileOperateComponent implements OnInit {

  data: any;
  isNew: boolean;
  profile: Profile;
  roles: Role[];
  regions = [
    { name: 'NOROCCIDENTE', checked: false },
    { name: 'SUROCCIDENTE', checked: false },
    { name: 'COSTA', checked: false }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private appService: AppService
  ) {
    // Update profile
    if (this.route.snapshot.params.id != 'crear') {
      this.isNew = false;
      this.data = this.route.snapshot.queryParams;
      // Checked regions by default
      if (this.data.regions) {
        for (let i = 0; i < this.data.regions.length; i++) {
          for (let j = 0; j < this.regions.length; j++) {
            if (this.data.regions[i] === this.regions[j].name) this.regions[j].checked = true;
          }
        }
      }
      this.profile = {
        id: this.data.id,
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        phoneNumber: this.data.phoneNumber,
        regions: this.data.regions || null,
        roles: this.data.roles
      }
      // Get all roles
      this.adminService.getRoles().subscribe(roles => {
        this.roles = roles;
        // Clean back selected roles
        for (let i = 0; i < this.roles.length; i++) this.roles[i].checked = false;
        // Get roles from profile
        let defaultRoles = []
        if (this.profile.roles != undefined) {
          for (let i = 0; i < this.profile.roles.length; i++) {
            defaultRoles.push(this.profile.roles[i])
          }
        }
        // Checked roles
        for (let i = 0; i < defaultRoles.length; i++) {
          for (let j = 0; j < this.roles.length; j++) {
            if (defaultRoles[i] === this.roles[j].name) this.roles[j].checked = true;
          }
        }
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de roles', error);
      });
    }
  }

  ngOnInit() { }

  selectRole(role: Role) {
    role.checked = !role.checked;
  }

  updateProfile(event, profile: Profile) {
    let userRegions = [];
    for (let i = 0; i < this.regions.length; i++) {
      if (this.regions[i].checked) userRegions.push(this.regions[i].name);
    }
    profile.regions = userRegions;
    profile.roles = {};
    let actualRoles = {}
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].checked) actualRoles[this.roles[i].name] = true;
    }
    profile.roles = actualRoles;
    this.adminService.updateProfile(profile)
      .then(res => {
        this.router.navigate(['/perfiles']);
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Actualizar perfil', error);
      })
  }

}
