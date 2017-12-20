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

  offersColumns = [
    'id',
    'solicitudId',
    'solicitudSupervisor',
    'solicitudEstacionNombre',
    'solicitudEstacionRegion',
    'solicitudEstacionDepartamento',
    'solicitudEstacionCiudad',
    'suministroServicioId',
    'suministroServicioNombre',
    'suministroServicioQty',
    'suministroServicioComentario'
  ];

  offersColumnsDynamics = [
    'tipoAcceso',
    'naturalezaServicio',
    'descripcionOds',
    'fechaRecibidoOds',
    'tipoOferta',
    'tarea',
    'descripcionTarea',
    'encargadoCliente',
    'fechaEjecucion',
    'confirmacionRecibido',
    'comentarioSupervisor',
    'usuario',
    'numeroOferta',
    'modalidad',
    'precioUnidadProveedor',
    'precioUnidadVenta',
    'precioUnidadCliente',
    'margen',
    'tipoAdquisicion',
    'proveedor',
    'tasOfertaAnterior',
    'fechaDespachoSupervisor',
    'fechaDespachoCompras',
    'fechaRespuestaCompras',
    'fechaEnvioOfertaCliente',
    'fechaEnvioOfertaClienteNegociada',
    'fechaRespuestaCliente',
    'fechaRespuestaClienteNegociada',
    'tipoRespuestaCliente',
    'tipoRespuestaClienteNegociada',
    'po',
    'fechaPo',
    'comentarioAnalista',
    'subestadoOferta',
    'estadoOferta',
    'fechaEntregaAlmacen',
    'comentarioAlmacenista',
    'comentarioCoordinador',
    'valorConciliadoCliente',
    'fechaConciliadoCliente',
    'comentarioFacturador',
    'fechaEnvioActaSmu',
    'comentarioActa',
    'fechaFirmaActaSmu',
    'fechaGrSmu',
  ];

  offersAllColumns = [
    'id',
    'solicitudId',
    'solicitudSupervisor',
    'solicitudEstacionNombre',
    'solicitudEstacionRegion',
    'solicitudEstacionDepartamento',
    'solicitudEstacionCiudad',
    'suministroServicioId',
    'suministroServicioNombre',
    'suministroServicioQty',
    'suministroServicioComentario',
    'tipoAcceso',
    'naturalezaServicio',
    'descripcionOds',
    'fechaRecibidoOds',
    'tipoOferta',
    'tarea',
    'descripcionTarea',
    'encargadoCliente',
    'fechaEjecucion',
    'confirmacionRecibido',
    'comentarioSupervisor',
    'usuario',
    'numeroOferta',
    'modalidad',
    'precioUnidadProveedor',
    'precioUnidadVenta',
    'precioUnidadCliente',
    'margen',
    'tipoAdquisicion',
    'proveedor',
    'tasOfertaAnterior',
    'fechaDespachoSupervisor',
    'fechaDespachoCompras',
    'fechaRespuestaCompras',
    'fechaEnvioOfertaCliente',
    'fechaEnvioOfertaClienteNegociada',
    'fechaRespuestaCliente',
    'fechaRespuestaClienteNegociada',
    'tipoRespuestaCliente',
    'tipoRespuestaClienteNegociada',
    'po',
    'fechaPo',
    'comentarioAnalista',
    'subestadoOferta',
    'estadoOferta',
    'fechaEntregaAlmacen',
    'comentarioAlmacenista',
    'comentarioCoordinador',
    'valorConciliadoCliente',
    'fechaConciliadoCliente',
    'comentarioFacturador',
    'fechaEnvioActaSmu',
    'comentarioActa',
    'fechaFirmaActaSmu',
    'fechaGrSmu',
  ];

  dataSourceOffers = new MatTableDataSource();
  isLoadingResultsOffers = true;
  currentRowSelect: any;
  currentRowSelectData: any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private offersService: OffersService, private router: Router, private appService: AppService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.offersService.getOffers()
      .subscribe(({ data }) => {
        debugger
        this.dataSourceOffers = new MatTableDataSource(data.ofertas);
        this.dataSourceOffers.paginator = this.paginator;
        this.dataSourceOffers.sort = this.sort;
        this.isLoadingResultsOffers = false;
      }, error => {
        this.isLoadingResultsOffers = false;
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de ofertas', error);
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceOffers.filter = filterValue;
  }

  selectRow(index, data) {
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }

  goToEdit() {
    this.router.navigate([`dashboard/ofertas/${this.currentRowSelectData.id}`]);
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
