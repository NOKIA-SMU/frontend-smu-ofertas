import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Request, Subsystem } from "../../models/dashboard.models";
import { RequestsService } from "./requests.service";
import { SubsystemsService } from "../subsystems/subsystems.service";
import { StationsService } from "../stations/stations.service";
import { ServicesService } from "../services/services.service";
import { SuppliesService } from "../supplies/supplies.service";
import { AppService } from "../../app.service";
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from "rxjs/Observable";

import { Profile } from '../../models/auth.models';
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-request-operate',
  templateUrl: './request-operate.component.html',
  styleUrls: ['../dashboard.component.scss', './requests.component.scss']
})

export class RequestOperateComponent implements OnInit {

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

  data: any;
  request: Request;
  isNew: boolean;
  subsystems: Subsystem[];
  priorities: string[];
  checkedRequestState: boolean = false;
  currentUser: Profile;
  selectedAnalyst: any = {};
  analysts: any;
  isSelectionSubsystem: boolean = false;

  // Tables
  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  currentRowSelect: any;
  currentRowSelectData: any = {};
  // Supplies
  supplies: any[] = [];
  suppliesColumns = [
    'activo',
    'id',
    'nombre',
    'descripcion',
    'unidad',
    'marca',
    'referencia',
    'cantidad',
    'comentario'
  ];
  dataSourceSupplies = new MatTableDataSource();
  isLoadingResultsSupplies = false;
  selectionSupplies = new SelectionModel(true, []);
  // Services
  services: any[] = [];
  servicesColumns = [
    'activo',
    'id',
    'nombre',
    'descripcion',
    'distancia',
    'peso',
    'tiempo',
    'unidad',
    'cantidad',
    'comentario'
  ];
  dataSourceServices = new MatTableDataSource();
  isLoadingResultsServices = false;
  selectionServices = new SelectionModel(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('PagSupplies') PagSupplies: MatPaginator;
  @ViewChild('PagServices') PagServices: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestsService: RequestsService,
    private subsystemService: SubsystemsService,
    private authService: AuthService,
    private adminService: AdminService,
    private stationService: StationsService,
    private servicesService: ServicesService,
    private suppliesService: SuppliesService,
    private appService: AppService
  ) {
    // Get subsystems
    this.subsystemService.getSubsystems()
      .subscribe(({ data }) => {
        this.subsystems = data.subsistemas
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de subsistemas', error)
      })

    // Get profiles filter by analysts
    this.adminService.getProfilesAnalysts()
      .subscribe(res => {
        this.analysts = res;
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de analistas', error)
      })

    this.requestsService.getPriorities()
      .subscribe(res => {
        this.priorities = res.data.prioridades;
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de prioridades', error)
      })
  }

  ngOnInit() {
    // Get actual user
    this.authService.currentUser()
      .subscribe(res => {
        this.currentUser = res
        // Filter stations by region
        if (this.currentUser.region || this.currentUser.roles.Administrador) {
          this.stationService.getStations(this.currentUser.region)
            .subscribe(res => {
              this.dataSource = new MatTableDataSource(res.data.estaciones);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.isLoadingResults = false;
            }, error => {
              debugger
              this.isLoadingResults = false;
              this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de estaciones', error)
            })
        }
        else {
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Este usuario no tiene asignada una región')
        }
      })
    // Update request
    if (this.route.snapshot.params.id != 'crear') {
      this.isNew = false;
      this.isSelectionSubsystem = true;
      this.requestsService.getRequestById(this.route.snapshot.params.id)
        .subscribe(res => {
          let suministros = [];
          let servicios = [];
          // Clone data
          for (let i = 0; i < res.data.solicitud.ordenSuministros.length; i++) {
            suministros.push(res.data.solicitud.ordenSuministros[i]);
          }
          for (let i = 0; i < res.data.solicitud.ordenServicios.length; i++) {
            servicios.push(res.data.solicitud.ordenServicios[i]);
          }
          // Create object request
          this.request = {
            id: res.data.solicitud.id,
            supervisorId: res.data.solicitud.supervisorId,
            supervisor: res.data.solicitud.supervisor,
            analistaId: res.data.solicitud.analistaId,
            analista: res.data.solicitud.analista,
            tas: res.data.solicitud.tas,
            estacion: {
              id: res.data.solicitud.estacion.id,
              name: res.data.solicitud.estacion.nombre
            },
            subsistema: res.data.solicitud.subsistema.id,
            suministros,
            servicios,
            prioridad: res.data.solicitud.prioridad,
            estadoSolicitud: res.data.solicitud.estadoSolicitud
          }
          this.selectedAnalyst = { id: res.data.solicitud.analistaId, firstName: res.data.solicitud.analista };
          // Get all supplies by subsystem
          this.supplies = [];
          this.isLoadingResultsSupplies = true;
          this.suppliesService.getSuppliesBySubsystem(this.request.subsistema)
            .subscribe(res => {
              // Clone response
              for (let i = 0; i < res.data.suministros.length; i++) {
                this.supplies.push({
                  id: res.data.suministros[i].id,
                  codigoLpu: res.data.suministros[i].codigoLpu,
                  codigoMm: res.data.suministros[i].codigoMm,
                  nombre: res.data.suministros[i].nombre,
                  descripcion: res.data.suministros[i].descripcion,
                  marca: res.data.suministros[i].marca,
                  referencia: res.data.suministros[i].referencia,
                  subsistema: res.data.suministros[i].subsistema,
                  unidad: res.data.suministros[i].unidad,
                  descripcionLpu: res.data.suministros[i].descripcionLpu,
                  valorLpu: res.data.suministros[i].valorLpu,
                })
              }
              // Update data by request data
              for (let i = 0; i < this.supplies.length; i++) {
                for (let j = 0; j < this.request.suministros.length; j++) {
                  if (this.supplies[i].id === this.request.suministros[j].suministro.id) {
                    this.supplies[i].qty = this.request.suministros[j].cantidad;
                    this.supplies[i].comentario = this.request.suministros[j].comentario;
                    this.selectionSupplies.toggle(this.supplies[i]);
                  }
                }
              }
              // Inicialize supplies table
              this.dataSourceSupplies = new MatTableDataSource(this.supplies);

              var seen = [];

              var replacer = function (key, value) {
                if (value != null && typeof value == "object") {
                  if (seen.indexOf(value) >= 0) {
                    return;
                  }
                  seen.push(value);
                }
                return value;
              };

              // if (this.PagSupplies) {
              this.dataSourceSupplies.paginator = this.PagSupplies;
              this.dataSourceSupplies.sort = this.sort;
              this.isLoadingResultsSupplies = false;
            }, error => {
              this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de sumnistros', error)
            })

          // Get services
          this.services = [];
          this.isLoadingResultsServices = true;
          this.servicesService.getServices(this.request.subsistema)
            .subscribe(res => {
              // Clone response
              for (let i = 0; i < res.data.servicios.length; i++) {
                this.services.push({
                  id: res.data.servicios[i].id,
                  codigoLpu: res.data.servicios[i].codigoLpu,
                  nombre: res.data.servicios[i].nombre,
                  descripcion: res.data.servicios[i].descripcion,
                  distancia: res.data.servicios[i].distancia,
                  peso: res.data.servicios[i].peso,
                  tiempo: res.data.servicios[i].tiempo,
                  subsistema: res.data.servicios[i].subsistema,
                  unidad: res.data.servicios[i].unidad,
                  valorLpu: res.data.servicios[i].valorLpu,
                  descripcionLpu: res.data.servicios[i].descripcionLpu,
                })
              }
              // Update data by request data
              for (let i = 0; i < this.services.length; i++) {
                for (let j = 0; j < this.request.servicios.length; j++) {
                  if (this.services[i].id === this.request.servicios[j].servicio.id) {
                    this.services[i].qty = this.request.servicios[j].cantidad;
                    this.services[i].comentario = this.request.servicios[j].comentario;
                    this.selectionServices.toggle(this.services[i]);
                  }
                }
              }
              // Inicialize services table
              this.dataSourceServices = new MatTableDataSource(this.services);
              this.dataSourceServices.paginator = this.PagServices;
              this.dataSourceServices.sort = this.sort;
              this.isLoadingResultsServices = false;
            }, error => {
              this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de servicios', error)
            })
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Solicitud por Id', error);
        })
    }
    // Create Request
    if (this.route.snapshot.params.id == 'crear') {
      this.selectedAnalyst = { };
      this.request = {
        supervisorId: '',
        supervisor: '',
        analistaId: '',
        analista: '',
        tas: '',
        estacion: {id: 0, name: ''},
        subsistema: 0,
        suministros: [],
        servicios: [],
        prioridad: null,
        estadoSolicitud: false
      }
      this.isNew = true;
    }
  }

  ngAfterViewInit() {  }

  selectRow(index, data) {
    this.request.estacion = {
      id: data.id,
      name: data.nombre
    }
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }

  selectSubsystem(event, subsystemId) {
    if (this.selectionSupplies.selected.length > 0) this.selectionSupplies.clear();
    if (this.selectionServices.selected.length > 0) this.selectionServices.clear();
    this.supplies = [];
    this.services = [];
    this.isSelectionSubsystem = true;
    this.isLoadingResultsServices = true;
    this.isLoadingResultsSupplies = true;
    // Get all services
    this.servicesService.getServices(subsystemId)
      // Clone response
      .subscribe(res => {
        for (let i = 0; i < res.data.servicios.length; i++) {
          this.services.push({
            id: res.data.servicios[i].id,
            codigoLpu: res.data.servicios[i].codigoLpu,
            nombre: res.data.servicios[i].nombre,
            descripcion: res.data.servicios[i].descripcion,
            unidad: res.data.servicios[i].unidad,
            distancia: res.data.servicios[i].distancia,
            peso: res.data.servicios[i].peso,
            tiempo: res.data.servicios[i].tiempo,
            qty: 0,
            comentario: '',
            valorLpu: res.data.servicios[i].valorLpu
          })
        }
        // Initialize services table
        this.dataSourceServices = new MatTableDataSource(this.services);
        this.dataSourceServices.paginator = this.PagServices;
        this.dataSourceServices.sort = this.sort;
        this.isLoadingResultsServices = false;
      }, error => {
        this.isLoadingResultsServices = false;
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de servicios', error);
      })

    // Get all supplies
    this.suppliesService.getSuppliesBySubsystem(subsystemId)
      .subscribe(res => {
        // Clone response
        debugger
        for (let i = 0; i < res.data.suministros.length; i++) {
          this.supplies.push({
            id: res.data.suministros[i].id,
            codigoLpu: res.data.suministros[i].codigoLpu,
            codigoMm: res.data.suministros[i].codigoMm,
            nombre: res.data.suministros[i].nombre,
            descripcion: res.data.suministros[i].descripcion,
            unidad: res.data.suministros[i].unidad,
            valorLpu: res.data.suministros[i].valorLpu,
            descripcionLpu: res.data.suministros[i].descripcionLpu,
            qty: 0,
            comentario: ''
          });
        }
        // Inicialize supplies table
        this.dataSourceSupplies = new MatTableDataSource(this.supplies);
        this.dataSourceSupplies.paginator = this.PagSupplies;
        this.dataSourceSupplies.sort = this.sort;
        this.isLoadingResultsSupplies = false;
      }, error => {
        this.isLoadingResultsSupplies = false;
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de suministros', error);
      })
  }

  selectAnalyst(event, analyst) {
    if (analyst.lastName)
      this.request.analista = `${analyst.firstName} ${analyst.lastName}`;
    else
      this.request.analista = analyst.firstName;
    this.request.analistaId = analyst.id;
  }

  // Normalize list for send request
  normalizeList(collection) {
    const tmpArray = []
    for (let i = 0; i < collection.length; i++) {
      collection[i].comentario = collection[i].comentario || '';
      collection[i].id = parseInt(collection[i].id);
      tmpArray.push({ pk: collection[i].id, qty: collection[i].qty, comentario: collection[i].comentario })
    }
    return tmpArray
  }

  saveRequest() {
    if (this.selectionSupplies.selected.length > 0)
      this.request.suministros = this.normalizeList(this.selectionSupplies.selected);
    else
      this.request.suministros = [];
    if (this.selectionServices.selected.length > 0)
      this.request.servicios = this.normalizeList(this.selectionServices.selected);
    else
      this.request.servicios = []
    this.request.supervisorId = this.currentUser.id;
    this.request.supervisor = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    if (this.isNew) {
      this.requestsService.createRequest(this.request)
        .subscribe(res => {
          if (res.data.createSolicitud.status == 200) {
            this.router.navigate(['/solicitudes']);
          }
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Crear solicitud', error);
        })
      } else {
        this.requestsService.updateRequest(this.route.snapshot.params.id, this.request)
        .subscribe(res => {
          if (res.data.updateSolicitud.status == 200) {
            this.router.navigate(['/solicitudes']);
          }
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Actualizar solicitud', error);
        })
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.dataSource.data.forEach(row => this.selectionSupplies.select(row));
  }

  // Filters Tables

  filterStations(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  filterSupplies(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceSupplies.filter = filterValue;
  }

  filterServices(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceServices.filter = filterValue;
  }

  imprimir(row) {
    debugger
  }

}
