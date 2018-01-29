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
  editState: boolean = false;
  profileToEdit: Profile;
  profileToAssignRole: Profile;
  showMoreProfile: boolean = false;
  roleSelected: any[] = [];
  showPerfilRoles: any[] = [];

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
  }

  goToEdit() {
    this.currentRowSelectData.roles = Object.keys(this.currentRowSelectData.roles);
    this.router.navigate([`admin/perfiles/${this.currentRowSelectData.id}`], { queryParams: this.currentRowSelectData, skipLocationChange: true });
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
