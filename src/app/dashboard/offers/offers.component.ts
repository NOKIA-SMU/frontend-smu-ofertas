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

  offertsColumns = [
    'id',
    'solicitudId',
    'solicitudSupervisor',
    'solicitudEstacionNombre',
    'solicitudEstacionRegion',
    'solicitudEstacionDepartamento',
    'solicitudEstacionCiudad',
    'suministroId',
    'suministroNombre',
    'servicioId',
    'servicioNombre',
  ];

  offertsColumnsDynamics = [
    'cantidad',
    'tipoOferta',
    'tarea',
    'descripcionTarea',
    'encargadoCliente',
    'fechaEjecucion',
    'confirmacionRecibido',
    'comentarioSupervisor',
    'subestadoOferta',
    'estadoOferta',
    'usuario',
    'numeroOferta',
    'modalidad',
    'percioUnidadProveedor',
    'percioTotalProveedor',
    'percioUnidadVenta',
    'percioTotalVenta',
    'percioUnidadCliente',
    'percioTotalCliente',
    'margen',
    'tipoAdquisicion',
    'fechaRecibidoCliente',
    'fechaDespachoSupervisor',
    'fechaDespachoCompras',
    'fechaRespuestaCompras',
    'fechaEnvioCliente',
    'fechaRespuestaCliente',
    'tipoRespuestaCliente',
    'po',
    'fechaPo',
    'comentarioAnalista',
    'fechaEntrgaAlmacen',
    'comentarioAlmacenista',
    'comentarioCoordinador',
    'valorConciliadoCliente',
    'fechaConciliadoCliente',
    'comentarioFacturador',
    'fechaEnvioActaSmu',
    'comentarioActa',
    'fechaFirmaActaSmu',
    'fechaGrSmu',
  ]

  offertsAllColumns = [
    'id',
    'solicitudId',
    'solicitudSupervisor',
    'solicitudEstacionNombre',
    'solicitudEstacionRegion',
    'solicitudEstacionDepartamento',
    'solicitudEstacionCiudad',
    'suministroId',
    'suministroNombre',
    'servicioId',
    'servicioNombre',
    'cantidad',
    'tipoOferta',
    'tarea',
    'descripcionTarea',
    'encargadoCliente',
    'fechaEjecucion',
    'confirmacionRecibido',
    'comentarioSupervisor',
    'subestadoOferta',
    'estadoOferta',
    'usuario',
    'numeroOferta',
    'modalidad',
    'percioUnidadProveedor',
    'percioTotalProveedor',
    'percioUnidadVenta',
    'percioTotalVenta',
    'percioUnidadCliente',
    'percioTotalCliente',
    'margen',
    'tipoAdquisicion',
    'fechaRecibidoCliente',
    'fechaDespachoSupervisor',
    'fechaDespachoCompras',
    'fechaRespuestaCompras',
    'fechaEnvioCliente',
    'fechaRespuestaCliente',
    'tipoRespuestaCliente',
    'po',
    'fechaPo',
    'comentarioAnalista',
    'fechaEntrgaAlmacen',
    'comentarioAlmacenista',
    'comentarioCoordinador',
    'valorConciliadoCliente',
    'fechaConciliadoCliente',
    'comentarioFacturador',
    'fechaEnvioActaSmu',
    'comentarioActa',
    'fechaFirmaActaSmu',
    'fechaGrSmu',
  ]

  dataSourceOfferts = new MatTableDataSource();
  isLoadingResultsOfferts = true;
  currentRowSelect: any;
  currentRowSelectData: any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private offersService: OffersService, private router: Router, private appService: AppService) { }

  ngOnInit() { }
  ngAfterViewInit() {
    this.offersService.getOffers()
      .subscribe(({ data }) => {
        this.dataSourceOfferts = new MatTableDataSource(data.ofertas);
        this.dataSourceOfferts.paginator = this.paginator;
        this.dataSourceOfferts.sort = this.sort;
        this.isLoadingResultsOfferts = false;
      }, error => {
        this.isLoadingResultsOfferts = false;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceOfferts.filter = filterValue;
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
    debugger
    console.log(row)
  }

}
