import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { ServicesService } from './services.service';
import { AuthService } from '../../auth/auth.service';
import { AppService } from '../../app.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['../dashboard.component.scss', './services.component.scss']
})

export class ServicesComponent implements OnInit {

  servicesColumns = [
    'id',
    'codigoLpu',
    'nombre',
    'descripcion',
    'distancia',
    'peso',
    'tiempo',
    'subsistema',
    'unidad',
    'valorLpu',
    'descripcionLpu',
    'estado',
    'subestado'
  ];
  dataSourceServices = new MatTableDataSource();
  isLoadingResultsServices = true;
  currentRowSelect: any;
  currentRowSelectData: any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private servicesService: ServicesService,
    private authService: AuthService,
    private appService: AppService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.servicesService.getServices()
      .subscribe(res => {
        // Inicialize services table
        this.dataSourceServices = new MatTableDataSource(res.data.servicios);
        this.dataSourceServices.paginator = this.paginator;
        this.dataSourceServices.sort = this.sort;
        this.isLoadingResultsServices = false;
      }, error => {
        this.isLoadingResultsServices = false;
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de servicios', error);
      })
  }

  applyFilterServices(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceServices.filter = filterValue;
  }

  selectRow(index, data) {
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }

  goToCreate() {
    this.router.navigate([`dashboard/servicios/crear`]);
  }

  goToEdit() {
    this.router.navigate([`dashboard/servicios/${this.currentRowSelectData.id}`]);
  }

}
