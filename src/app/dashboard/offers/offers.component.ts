import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { OffersService } from "./offers.service";
import { AppService } from "../../app.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['../dashboard.component.scss', 'offers.component.scss']
})

export class OffersComponent implements OnInit {

  displayedColumns = [
    'id',
    'solicitud',
    'suministro',
    'servicio',
    'estadoOferta',
    'subestadoOferta'
  ];

  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  currentRowSelect: any;
  currentRowSelectData: any = {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private offersService: OffersService, private router: Router, private appService: AppService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.offersService.getOffers()
      .subscribe(({ data }) => {
        this.dataSource = new MatTableDataSource(data.ofertas);
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

  isArray(obj: any) {
    return Array.isArray(obj);
  }

  isObject(val: any) {
    return (typeof val === 'object');
  }

  isString(val: any) {
    return (typeof val === 'string');
  }

  imprimir(row) {
    console.log(row)
  }

}
