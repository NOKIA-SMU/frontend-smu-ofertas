import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { StationsService } from "./stations.service";

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
  currentRowSelectData: any = {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private stationsService: StationsService, private router: Router) { debugger}

  ngOnInit() { }

  ngAfterViewInit() {
    this.stationsService.getStations()
      .subscribe(({ data }) => {
        this.dataSource = new MatTableDataSource(data.estaciones);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      }, error => {
        this.isLoadingResults = false;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selecRow(index, data) {
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }

  goToEdit() {
    this.router.navigate([`dashboard/estaciones/${this.currentRowSelectData.id}`], { queryParams: this.currentRowSelectData, skipLocationChange: true});
  }

  goToCreate() {
    this.router.navigate([`dashboard/estaciones/${this.currentRowSelectData.id}`], { queryParams: this.currentRowSelectData, skipLocationChange: true});
  }

  delete() {

  }



}
