import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { StationsService } from "./stations.service";
import { Profile, Role, Permission } from '../../models/auth.models';
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../../admin/admin.service';
import { AppService } from "../../app.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['../dashboard.component.scss', './stations.component.scss']
})

export class StationsComponent implements OnInit {

  displayedColumns = [
    'id',
    'nombre',
    'ubicacion',
    'region',
    'departamento',
    'ciudad',
    'direccion',
    'latitud',
    'longitud',
    'estructura',
    'categoria'
  ];

  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  currentRowSelect: any;
  currentRowSelectData: any = {};

  currentUser: Profile;
  currentRoles: Role[];
  rolesGeneral: Role[];
  userPermissions: Permission[] = [];
  rolesUserParsed: any[] = [];

  permissionsView = {
    create: false,
    read: false,
    update: false,
    delete: false
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private stationsService: StationsService,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private authService: AuthService,
    private appService: AppService
  ) {

    sessionStorage.removeItem('lastModelQuery');
    sessionStorage.removeItem('lastPermissionQuery');
    // this.adminService.getRoles()
    //   .subscribe(res => {
    //     debugger
    //     this.currentRoles = res;
    //   }, error => {

    //   })
    var te = this.validateSecurity('crear')
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.stationsService.getStations('')
      .subscribe(({ data }) => {
        this.dataSource = new MatTableDataSource(data.estaciones);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      }, error => {
        this.isLoadingResults = false;
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de estaciones')
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  selectRow(index, data) {
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }

  goToEdit() {
    this.router.navigate([`dashboard/estaciones/${this.currentRowSelectData.id}`], { queryParams: this.currentRowSelectData, skipLocationChange: true});
  }

  goToCreate() {
    this.router.navigate([`dashboard/estaciones/crear`]);
  }

  deleteStation() {
    this.stationsService.deleteStation(this.currentRowSelectData.id)
      .subscribe(res => {
        if (res.data.deleteEstacion.status === 200) this.router.navigate(['/estaciones']);
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Vuelva a intentarlo', error);
      })
  }

  validateSecurity(item) {

    let lastModelQuery = this.route.snapshot.routeConfig.path;
    let lastPermissionQuery = item;

    this.adminService.getRoles().subscribe(roles => {
      this.rolesGeneral = roles;
      this.authService.currentUser()
        .subscribe(res => {
          this.currentUser = res;
          for (let i = 0; i < this.rolesGeneral.length; i++) {
            if (res.roles[this.rolesGeneral[i].name]) {
              this.rolesUserParsed.push({ name: this.rolesGeneral[i].name, id: this.rolesGeneral[i].id })
            }
          }
          // Object.keys(res.roles)
          if (lastModelQuery === JSON.parse(sessionStorage.getItem('lastModelQuery')) && lastPermissionQuery === JSON.parse(sessionStorage.getItem('lastPermissionQuery'))) {

          } else {
            sessionStorage.setItem('lastModelQuery', JSON.stringify(this.route.snapshot.routeConfig.path));
            sessionStorage.setItem('lastPermissionQuery', JSON.stringify(item));
            this.adminService.getRolePermissions(this.rolesUserParsed[0]).subscribe(res => {
              res.map(res => {
                for (let k = 0; k < res.list.length; k++) {
                  this.userPermissions.push(res.list[k]);
                }
                return true
              })
            }, error => {
              this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Vuelva a intentarlo');
              return false
            })
          }


          // sessionStorage.setItem('lastRolesUserQuery', JSON.stringify(this.rolesUserParsed[0]));


          // let query = JSON.parse(sessionStorage.getItem('lastRolesUserQuery'));
        }, error => {
          debugger
        })
      }, error => {
        debugger
    });
    // this.route.snapshot.routeConfig.path;
  }



}
