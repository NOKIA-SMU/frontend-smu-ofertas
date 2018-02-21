import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from './services.service';
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

  permissionsView = {
    crear: null,
    leer: null,
    editar: null,
    eliminar: null,
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicesService: ServicesService,
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

  deleteService() {
    this.servicesService.deleteService(this.currentRowSelectData.id)
      .subscribe(res => {
        if (res.data.deleteServicio.status === 200)
          this.router.navigate(['/servicios']);
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Eliminar servicio', error);
      })
  }

}
