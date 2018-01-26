import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { Profile, Role, Permission } from '../../models/auth.models';
import { AuthService } from '../../auth/auth.service';
import { AppService } from "../../app.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'admin-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['../admin.component.scss', './profiles.component.scss']
})

export class ProfilesComponent implements OnInit {

  profileColumns = [
    'nombre',
    'apellido',
    'region',
    'roles',
    'telefono',
    'email',
    'id'
  ];

  dataSourceProfiles = new MatTableDataSource();
  isLoadingProfiles = true;
  currentRowSelect: any;
  currentRowSelectData: any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  profiles: Profile[];
  roles: Role[];
  editState: boolean = false;
  profileToEdit: Profile;
  profileToAssignRole: Profile;
  showMoreProfile: boolean = false;
  roleSelected: any[] = [];
  showPerfilRoles: any[] = [];
  regions = [
    'NOROCCIDENTE',
    'SUROCCIDENTE',
    'COSTA'
  ]

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private appService: AppService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    // Get all profiles
    this.adminService.getProfiles()
      .subscribe(profiles => {
        for (let i = 0; i < profiles.length; i++) {
          if (profiles[i].roles) profiles[i].rolesParsed = Object.keys(profiles[i].roles);
        }
        this.profiles = profiles;
        this.dataSourceProfiles = new MatTableDataSource(profiles);
        this.dataSourceProfiles.paginator = this.paginator;
        this.dataSourceProfiles.sort = this.sort;
        this.isLoadingProfiles = false;
      }, error => {
        this.isLoadingProfiles = false;
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de perfiles', error);
      });
      // Get all roles
      this.adminService.getRoles().subscribe(roles => {
        this.roles = roles;
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de roles', error);
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
    this.showPerfilRoles = [];
    if (profile.roles != undefined) {
      for (let i = 0; i < Object.keys(profile.roles).length; i++) {
        this.showPerfilRoles.push(Object.keys(profile.roles)[i])
      }
    }
    this.editState = false;
    this.showMoreProfile = !this.showMoreProfile;
    this.profileToEdit = profile;
  }

  selectRole(role: Role) {
    role.checked = !role.checked;
  }

  goToEdit() {
    this.router.navigate([`admin/perfiles/${this.currentRowSelectData.id}`], { queryParams: this.currentRowSelectData, skipLocationChange: true });
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceProfiles.filter = filterValue;
  }

  selectRow(index, data) {
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }

}
