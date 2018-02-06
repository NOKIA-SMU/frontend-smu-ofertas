import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard.routing.module'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// Material
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';

import { StationsComponent } from './stations/stations.component';
import { StationOperateComponent } from './stations/station-operate.component';
import { StationsService } from './stations/stations.service';

import { SubsystemsComponent } from './subsystems/subsystems.component';
import { SubsystemOperateComponent } from './subsystems/subsystem-operate.component';
import { SubsystemsService } from './subsystems/subsystems.service';

import { RequestsComponent } from './requests/requests.component';
import { RequestOperateComponent } from './requests/request-operate.component';
import { RequestsService } from './requests/requests.service';

import { SuppliesComponent } from './supplies/supplies.component';
import { SupplieOperateComponent } from './supplies/supplie-operate.component';
import { SuppliesService } from './supplies/supplies.service';

import { ServicesComponent } from './services/services.component';
import { ServiceOperateComponent } from './services/service-operate.component';
import { ServicesService } from './services/services.service';

import { OffersComponent } from './offers/offers.component';
import { OfferOperateComponent } from './offers/offer-operate.component';
import { OffersService } from './offers/offers.service';

import { TruncateModule } from 'ng2-truncate';
import { Pipe, PipeTransform } from '@angular/core';
import { ExportComponent } from './export/export.component';

@Pipe({ name: 'replaceLineBreaks' })
export class ReplaceLineBreaks implements PipeTransform {
  transform(value: string): string {
    if (value) {
      if (typeof value === 'number') {
        return value;
      } else {
        let newValue = value.split('_').join(' ');
        return `${newValue}`;
      }
    }
  }
}

@Pipe({ name: 'dictionary' })
export class Dictionary implements PipeTransform {
  transform(value: string): string {
    if (value) {
      let newValue = value;
      if (value === 'analista') newValue = 'Analista'
      if (value === 'tipoSitio') newValue = 'Tipo sitio'
      if (value === 'tipoAcceso') newValue = 'Tipo acceso'
      if (value === 'naturalezaServicio') newValue = 'Naturaleza servicio'
      if (value === 'descripcionOds') newValue = 'Descripción ods'
      if (value === 'fechaRecibidoOds') newValue = 'Fecha recibido ods'
      if (value === 'semanaRecibidoOds') newValue = 'Semana recibido ods'
      if (value === 'tipoOferta') newValue = 'Tipo oferta'
      if (value === 'workOrder') newValue = 'Work order'
      if (value === 'descripcionTarea') newValue = 'Descripción tarea'
      if (value === 'encargadoCliente') newValue = 'Encargado cliente'
      if (value === 'fechaEjecucion') newValue = 'Fecha ejecución'
      if (value === 'confirmacionRecibido') newValue = 'Confirmación recibido'
      if (value === 'comentarioSupervisor') newValue = 'Comentario supervisor'
      if (value === 'numeroOferta') newValue = 'Numero oferta'
      if (value === 'modalidad') newValue = 'Modalidad'
      if (value === 'precioUnidadProveedor') newValue = 'Precio unidad proveedor'
      if (value === 'precioTotalProveedor') newValue = 'Precio total proveedor'
      if (value === 'precioUnidadVenta') newValue = 'Precio unidad venta'
      if (value === 'precioTotalVenta') newValue = 'Precio total venta'
      if (value === 'precioUnidadCliente') newValue = 'Precio unidad cliente'
      if (value === 'precioTotalCliente') newValue = 'Precio total cliente'
      if (value === 'margen') newValue = 'Margen'
      if (value === 'tipoAdquisicion') newValue = 'Tipo adquisicion'
      if (value === 'proveedor') newValue = 'Proveedor'
      if (value === 'tasOfertaAnterior') newValue = 'Tas oferta anterior'
      if (value === 'fechaDespachoSupervisor') newValue = 'Fecha despacho supervisor'
      if (value === 'semanaDespachoSupervisor') newValue = 'Semana despacho supervisor'
      if (value === 'fechaDespachoCompras') newValue = 'Fecha despacho compras'
      if (value === 'semanaDespachoCompras') newValue = 'Semana despacho compras'
      if (value === 'fechaRespuestaCompras') newValue = 'Fecha respuesta compras'
      if (value === 'semanaRespuestaCompras') newValue = 'Semana respuesta compras'
      if (value === 'fechaEnvioOfertaCliente') newValue = 'Fecha envio oferta cliente'
      if (value === 'semanaEnvioOfertaCliente') newValue = 'Semana envio oferta cliente'
      if (value === 'fechaEnvioOfertaClienteNegociada') newValue = 'Fecha envio oferta cliente negociada'
      if (value === 'semanaEnvioOfertaClienteNegociada') newValue = 'Semana envio oferta cliente negociada'
      if (value === 'fechaRespuestaCliente') newValue = 'Fecha respuesta cliente'
      if (value === 'semanaRespuestaCliente') newValue = 'Semana respuesta cliente'
      if (value === 'fechaRespuestaClienteNegociada') newValue = 'Fecha respuesta cliente negociada'
      if (value === 'semanaRespuestaClienteNegociada') newValue = 'Semana respuesta cliente negociada'
      if (value === 'tipoRespuestaCliente') newValue = 'Tipo respuesta cliente'
      if (value === 'tipoRespuestaClienteNegociada') newValue = 'Tipo respuesta cliente negociada'
      if (value === 'po') newValue = 'PO'
      if (value === 'fechaPo') newValue = 'Fecha PO'
      if (value === 'valorPo') newValue = 'Valor PO'
      if (value === 'comentarioAnalista') newValue = 'Comentario analista'
      if (value === 'subestadoOferta') newValue = 'Subestado oferta'
      if (value === 'estadoOferta') newValue = 'Estado oferta'
      if (value === 'fechaEntregaAlmacen') newValue = 'Fecha entrega almacen'
      if (value === 'comentarioAlmacenista') newValue = 'Comentario almacenista'
      if (value === 'comentarioCoordinador') newValue = 'Comentario coordinador'
      if (value === 'tipoElemento') newValue = 'Tipo elemento'
      if (value === 'valorConciliadoCliente') newValue = 'Valor conciliado cliente'
      if (value === 'fechaConciliadoCliente') newValue = 'Fecha conciliado cliente'
      if (value === 'comentarioFacturador') newValue = 'Comentario facturador'
      if (value === 'fechaEnvioActaSmu') newValue = 'Fecha envio acta smu'
      if (value === 'comentarioActa') newValue = 'Comentario acta'
      if (value === 'fechaFirmaActaSmu') newValue = 'Fecha firma acta smu'
      if (value === 'fechaGrSmu') newValue = 'Fecha Gr smu'
      return `${newValue}`;
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    NgxDatatableModule,
    MaterialModule,
    TruncateModule
  ],
  declarations: [
    DashboardComponent,
    StationsComponent,
    StationOperateComponent,
    SubsystemsComponent,
    SubsystemOperateComponent,
    RequestsComponent,
    RequestOperateComponent,
    SuppliesComponent,
    SupplieOperateComponent,
    ServicesComponent,
    ServiceOperateComponent,
    OffersComponent,
    ReplaceLineBreaks,
    Dictionary,
    OfferOperateComponent,
    ExportComponent],
  providers: [
    DatePipe,
    DashboardService,
    StationsService,
    SubsystemsService,
    RequestsService,
    OffersService,
    ServicesService,
    SuppliesService
  ]
})

export class DashboardModule { }



