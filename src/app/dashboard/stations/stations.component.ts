import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { StationsService } from "./stations.service";
import { Profile, Role } from '../../models/auth.models';
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
  currentRoles: Role;

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

    // this.adminService.getRoles()
    //   .subscribe(res => {
    //     debugger
    //     this.currentRoles = res;
    //   }, error => {

    //   })
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
    this.authService.currentUser()
      .subscribe(res => {
        debugger
        this.currentUser = res;
      }, error => {

      })
    debugger
    // this.route.snapshot.routeConfig.path;
  }

}
