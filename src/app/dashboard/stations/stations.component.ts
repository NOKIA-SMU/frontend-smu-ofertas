import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DashboardService } from "../dashboard.service";
import { Router } from '@angular/router';

declare var $: any;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  dataSource = new MatTableDataSource();

  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.dashboardService.getStations()
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

  goToDetail(data) {
    // debugger
    this.router.navigate(['dashboard/estaciones/23'], { queryParams: data, skipLocationChange: true});
  }

}
