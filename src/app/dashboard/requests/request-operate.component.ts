import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-request-operate',
  templateUrl: './request-operate.component.html',
  styleUrls: ['../dashboard.component.scss', './requests.component.scss']
})

export class RequestOperateComponent implements OnInit, AfterViewInit {

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
  isSendRequest: boolean = false;

  // Tables initialize

  // Stations
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
  currentRowSelect: any;
  currentRowSelectData: any = {};
  @ViewChild('PagStations') PagStations: MatPaginator;
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
  @ViewChild('PagSupplies') PagSupplies: MatPaginator;
  // Supplies selected
  suppliesSelectedColumns = ['id', 'nombre', 'descripcion']
  dataSourceSuppliesSelected = new MatTableDataSource();
  isLoadingResultsSuppliesSelected = false;
  @ViewChild('PagSuppliesSelected') PagSuppliesSelected: MatPaginator;
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
  @ViewChild('PagServices') PagServices: MatPaginator;
  // Services selected
  servicesSelectedColumns = ['id', 'nombre', 'descripcion']
  dataSourceServicesSelected = new MatTableDataSource();
  isLoadingResultsServicesSelected = false;
  @ViewChild('PagServicesSelected') PagServicesSelected: MatPaginator;

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
        for (let i = 0; i < res.length; i++) {
          res[i].fullName = res[i].firstName + ' ' + res[i].lastName;
        }
        this.analysts = res;
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de analistas', error)
      })
    // Get priorities
    this.requestsService.getPriorities()
      .subscribe(res => {
        this.priorities = res.data.prioridades;
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de prioridades', error)
      })
  }

  ngOnInit() { }

  ngAfterViewInit() {
    // Get actual user
    this.authService.currentUser()
      .subscribe(res => {
        this.currentUser = res
        // Filter stations by region
        if (this.currentUser.regions.length > 0) {
          this.filterStationsByRegions(this.currentUser.regions)
            .then(res => {
              this.dataSource = new MatTableDataSource(res[0].data);
              this.dataSource.paginator = this.PagStations;
              this.dataSource.sort = this.sort;
              this.isLoadingResults = false;
            }, error => {
              this.isLoadingResults = false;
              this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de estaciones por región', error);
            })
        }
        else {
          let error = { message: 'User not found regions' };
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Este usuario no tiene asignada una región', error);
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
          this.selectedAnalyst = { id: res.data.solicitud.analistaId, fullName: res.data.solicitud.analista };
          // Get all supplies by subsystem
          this.supplies = [];
          this.isLoadingResultsSupplies = true;
          this.isLoadingResultsSuppliesSelected = true;
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
              // Initialize supplies table
              this.dataSourceSupplies = new MatTableDataSource(this.supplies);
              this.dataSourceSupplies.paginator = this.PagSupplies;
              this.dataSourceSupplies.sort = this.sort;
              this.isLoadingResultsSupplies = false;
              // Inicialize supplies selected table
              this.dataSourceSuppliesSelected = new MatTableDataSource(this.selectionSupplies.selected);
              this.dataSourceSuppliesSelected.paginator = this.PagSuppliesSelected;
              this.dataSourceSuppliesSelected.sort = this.sort;
              this.isLoadingResultsSuppliesSelected = false;
            }, error => {
              this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de sumnistros', error);
            })

          // Get services
          this.services = [];
          this.isLoadingResultsServices = true;
          this.isLoadingResultsServicesSelected = true;
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
              // Inicialize services selected table
              this.dataSourceServicesSelected = new MatTableDataSource(this.selectionServices.selected);
              this.dataSourceServicesSelected.paginator = this.PagServicesSelected;
              this.dataSourceServicesSelected.sort = this.sort;
              this.isLoadingResultsServicesSelected = false;
            }, error => {
              this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de servicios', error);
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

  // Filter stations by regions
  filterStationsByRegions(regions: any[]) {
    return new Promise((resolve, reject) => {
      let stationsFilteredByRegion = [];
      for (let i = 0; i < regions.length; i++) {
        this.stationService.getStations(regions[i])
          .subscribe(res => {
            for (let k = 0; k < res.data.estaciones.length; k++) {
              stationsFilteredByRegion.push(res.data.estaciones[k])
            }
            resolve([{ data: stationsFilteredByRegion }])
          }, error => {
            reject({
              message: 'Error filter stations by regions'
            })
          })
      }
    })
  }

  // Select row list stations
  selectRow(index, data) {
    this.request.estacion = {id: data.id, name: data.nombre}
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }
  // Select subsystem from select input
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
  // Select analyst from selecty input
  selectAnalyst(event, analyst) {
    this.request.analista = analyst.fullName;
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
  // Save and send request
  saveRequest() {
    this.isSendRequest = true;
    let statesRequest = false;
    if (this.request.tas) {
      if (this.request.tas.length != 15) {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Tas no tiene 15 caracteres');
        statesRequest = false;
      } else
        statesRequest = true;
    }
    if (statesRequest) {
      if (this.selectionSupplies.selected.length > 0)
        this.request.suministros = this.normalizeList(this.selectionSupplies.selected);
      else
        this.request.suministros = [];
      if (this.selectionServices.selected.length > 0)
        this.request.servicios = this.normalizeList(this.selectionServices.selected);
      else
        this.request.servicios = []

      if (this.isNew) {
        this.request.supervisorId = this.currentUser.id;
        this.request.supervisor = this.currentUser.fullName;
        this.requestsService.createRequest(this.request)
          .subscribe(res => {
            if (res.data.createSolicitud.status == 200) {
              this.isSendRequest = false;
              this.router.navigate(['/solicitudes']);
            }
          }, error => {
            this.isSendRequest = false;
            this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Crear solicitud', error);
          })
      } else {
        this.requestsService.updateRequest(this.route.snapshot.params.id, this.request)
        .subscribe(res => {
          if (res.data.updateSolicitud.status == 200) {
            this.isSendRequest = false;
            this.router.navigate(['/solicitudes']);
          }
          }, error => {
            this.isSendRequest = false;
            this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Actualizar solicitud', error);
          })
      }
    }
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
  filterSuppliesSelected(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceSuppliesSelected.filter = filterValue;
  }
  filterServices(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceServices.filter = filterValue;
  }
  filterServicesSelected(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceServicesSelected.filter = filterValue;
  }

  refreshSelectionSupplies() {
    this.dataSourceSuppliesSelected = new MatTableDataSource(this.selectionSupplies.selected);
    this.dataSourceSuppliesSelected.paginator = this.PagSuppliesSelected;
    this.dataSourceSuppliesSelected.sort = this.sort;
  }

  refreshSelectionServices() {
    this.dataSourceServicesSelected = new MatTableDataSource(this.selectionServices.selected);
    this.dataSourceServicesSelected.paginator = this.PagServicesSelected;
    this.dataSourceServicesSelected.sort = this.sort;
  }
}
