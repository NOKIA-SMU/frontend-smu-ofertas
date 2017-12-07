import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { RequestsService } from "./requests.service";
import { AppService } from "../../app.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['../dashboard.component.scss', './requests.component.scss']
})

export class RequestsComponent implements OnInit {

  displayedColumns = [
    'id',
    'supervisor',
    'analista',
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

  constructor(private requestsService: RequestsService, private router: Router, private appService: AppService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.requestsService.getRequests()
      .subscribe(({ data }) => {
        this.dataSource = new MatTableDataSource(data.solicitudes);
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

  selectRow(index, data) {
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }

  goToEdit() {
    this.router.navigate([`dashboard/solicitudes/${this.currentRowSelectData.id}`], { queryParams: this.currentRowSelectData, skipLocationChange: true });
  }

  goToCreate() {
    this.router.navigate([`dashboard/solicitudes/crear`]);
  }

  deleteRequest() {
    this.requestsService.deleteRequest(this.currentRowSelectData.id)
      .subscribe(res => {
        // if (res.data.updateEstacion.status) {
        // this.router.navigate(['/solicitudes']);
        // }
        debugger
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Vuelva a intentarlo')
      })
  }

}
