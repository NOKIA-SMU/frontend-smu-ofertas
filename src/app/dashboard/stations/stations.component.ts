import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { StationsService } from "./stations.service";
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

  permissionsView: {} = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private stationsService: StationsService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {
    this.appService.validateSecurity(this.route.snapshot.routeConfig.path)
      .then(res => {
        this.permissionsView = {
          crear: res['crear'],
          leer: res['leer'],
          editar: res['editar'],
          eliminar: res['eliminar']
        }
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Validación de seguridad', error);
      })
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
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de estaciones', error);
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
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Eliminar estación', error);
      })
  }

}
