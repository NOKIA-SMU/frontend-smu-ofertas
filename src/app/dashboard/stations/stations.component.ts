import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DashboardService } from "../dashboard.service";

declare var $: any;

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['../dashboard.component.scss']
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
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.dashboardService.getStations()
      .subscribe(({ data }) => {
        this.dataSource = new MatTableDataSource(data.estaciones);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectRow() {
    debugger
  }

}
