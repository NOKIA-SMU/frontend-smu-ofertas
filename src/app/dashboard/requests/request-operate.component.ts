import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Request, Subsystem } from "../../models/dashboard.models";
import { RequestsService } from "./requests.service";
import { SubsystemsService } from "../subsystems/subsystems.service";
import { StationsService } from "../stations/stations.service";
import { ServicesService } from "../services/services.service";
import { SuppliesService } from "../supplies/supplies.service";
import { AppService } from "../../app.service";
import { Observable } from "rxjs/Observable";

import { Profile } from '../../models/auth.models';
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../../admin/admin.service';
import { request } from 'https';

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

  suppliesColumns = [
    'activo',
    'id',
    'nombre',
    'cantidad'
  ];

  servicesColumns = [
    'activo',
    'id',
    'nombre',
    'cantidad'
  ];

  id: number;
  data: any;
  request: Request;
  isNew: boolean;
  subsystems: Subsystem[];
  priorities: string[];
  checkedRequestState: boolean = false;
  currentUser: Profile;
  selectedAnalyst: any = {};
  analysts: any;

  // Tables
  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  currentRowSelect: any;
  currentRowSelectData: any = {};

  supplies: any[] = [];
  dataSourceSupplies = new MatTableDataSource();
  currentRowSelectDataSupplies: any[] = [];
  isLoadingResultsSupplies = false;

  services: any[] = [];
  dataSourceServices = new MatTableDataSource();
  currentRowSelectDataServices: any[] = [];
  isLoadingResultsServices = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
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
        debugger
      })

    // Get actual token session
    this.authService.getToken()
      .then(res => {
      }, error => {
        debugger
      })

    // Get profiles filter by analysts
    this.adminService.getProfilesAnalysts()
      .subscribe(res => {
        this.analysts = res;
      }, error => {
        debugger
      })

    this.requestsService.getPriorities()
      .subscribe(res => {
        this.priorities = res.data.prioridades;
      })

    if (this.route.snapshot.params.id != 'crear') {
      this.isNew = false;
      this.requestsService.getRequestById(this.route.snapshot.params.id)
        .subscribe(res => {
          this.request = {
            id: res.data.solicitud.id,
            supervisorId: res.data.solicitud.supervisorId,
            supervisor: res.data.solicitud.supervisor,
            analistaId: res.data.solicitud.analistaId,
            analista: res.data.solicitud.analista,
            tas: res.data.solicitud.tas,
            estacion: res.data.solicitud.estacion.id,
            subsistema: res.data.solicitud.subsistema.id,
            suministros: res.data.solicitud.suministros,
            servicios: res.data.solicitud.servicios,
            prioridad: res.data.solicitud.prioridad,
            estadoSolicitud: res.data.solicitud.estadoSolicitud
          }
          this.selectedAnalyst = { id: res.data.solicitud.analistaId, firstName: res.data.solicitud.analista };
          this.selectSubsystem(null, res.data.solicitud.subsistema.id, res.data.solicitud.suministros, res.data.solicitud.servicios);
        }, error => {

        })
      // this.data = JSON.parse(localStorage.getItem('actualRequest'));
      // localStorage.removeItem('actualRequest')
      // this.selectSubsystem(null, this.data.subsistema.id)
    } else {
      this.request = {
        supervisorId: '',
        supervisor: '',
        analistaId: '',
        analista: '',
        tas: '',
        estacion: 0,
        subsistema: 0,
        suministros: [],
        servicios: [],
        prioridad: null,
        estadoSolicitud: false
      }
      this.isNew = true;
    }
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.authService.currentUser()
      .subscribe(res => {
        this.currentUser = res
        this.stationService.getStations(this.currentUser.region)
          .subscribe(res => {
            this.dataSource = new MatTableDataSource(res.data.estaciones);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isLoadingResults = false;
          }, res => {
            debugger
            this.isLoadingResults = false;
            this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de estaciones')
          })
        })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectRow(index, data) {
    this.request.estacion = data.id
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }

  selectRowSupplies(row) {
    let actualItem = this.filterExistById(row, this.currentRowSelectDataSupplies)
    if (!actualItem) {
      this.currentRowSelectDataSupplies.push(row)
    } else {
      this.currentRowSelectDataSupplies.splice(this.filterByIndex(row, this.currentRowSelectDataSupplies), 1)
    }
    console.log(this.currentRowSelectDataSupplies)
  }

  filterExistById(row, collection) {
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].id === row.id) return collection[i]
    }
    return null
  }

  filterByIndex(row, collection) {
    for (let i = 0; i < collection.length; i++)
      if (collection[i].id === row.id) return i
  }

  selectRowServices(row) {
    let actualItem = this.filterExistById(row, this.currentRowSelectDataServices)
    if (!actualItem) {
      this.currentRowSelectDataServices.push(row)
    } else {
      this.currentRowSelectDataServices.splice(this.filterByIndex(row, this.currentRowSelectDataServices), 1)
    }
    console.log(this.currentRowSelectDataServices)
  }

  selectSubsystem(event, subsystemId, requestSupplies?, requestServices?) {
    this.supplies = []
    this.services = []
    this.isLoadingResultsServices = true;
    this.isLoadingResultsSupplies = true;
    // Get all services
    this.servicesService.getServices(subsystemId)
      .subscribe(res => {
        if (this.isNew) {
          for (let i = 0; i < res.data.servicios.length; i++) {
            this.services.push({ id: res.data.servicios[i].id, nombre: res.data.servicios[i].nombre, qty: 0 })
          }
        } else {
          // debugger
        }
        this.dataSourceServices = new MatTableDataSource(this.services);
        this.dataSourceServices.paginator = this.paginator;
        this.dataSourceServices.sort = this.sort;
        this.isLoadingResultsServices = false;
      }, error => {
        this.isLoadingResultsServices = false;
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de servicios')
      })

    // Get all supplies
    this.suppliesService.getSupplies(subsystemId)
      .subscribe(res => {
        if (this.isNew) {
          for (let i = 0; i < res.data.suministros.length; i++) {
            this.supplies.push({ id: res.data.suministros[i].id, nombre: res.data.suministros[i].nombre, qty: 0 })
          }
        } else {
          for (let i = 0; i < res.data.suministros.length; i++) {
            this.supplies.push({ id: res.data.suministros[i].id, nombre: res.data.suministros[i].nombre, qty: 0 })
          }

          for (let i = 0; i < this.supplies.length; i++) {
            for (let j = 0; j < requestSupplies.length; j++) {
              if (this.supplies[i].id === requestSupplies[j].id) {
                this.supplies[i].qty = requestSupplies[j].cantidad;
                this.supplies[i].checked = true;
              }
            }
            // this.supplies.push({ id: res.data.suministros[i].id, nombre: res.data.suministros[i].nombre, qty: 0 })
          }
          console.log(this.supplies)
          // debugger
        }
        this.dataSourceSupplies = new MatTableDataSource(this.supplies);
        this.dataSourceSupplies.paginator = this.paginator;
        this.dataSourceSupplies.sort = this.sort;
        this.isLoadingResultsSupplies = false;
      }, res => {
        this.isLoadingResultsSupplies = false;
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de suministros')
      })
  }

  selectAnalyst(event, analyst) {
    this.request.analistaId = analyst.id;
    this.request.analista = `${analyst.firstName} ${analyst.lastName}`;
  }

  normalizeList(collection) {
    const tmpArray = []
    for (let i = 0; i < collection.length; i++) {
      collection[i].id = parseInt(collection[i].id);
      tmpArray.push({ pk: collection[i].id, qty: collection[i].qty })
    }
    return tmpArray
  }

  createRequest() {
    if (this.currentRowSelectDataSupplies.length > 0) this.request.suministros = this.normalizeList(this.currentRowSelectDataSupplies);
    if (this.currentRowSelectDataServices.length > 0) this.request.servicios = this.normalizeList(this.currentRowSelectDataServices);
    this.request.supervisorId = this.currentUser.id;
    this.request.supervisor = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    this.requestsService.createRequest(this.request)
      .subscribe(res => {
        if (res.data.createSolicitud.status == 200) {
          this.router.navigate(['/solicitudes']);
        }
      }, error => {
        debugger
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Vuelva a intentarlo');
      })
  }

  updateRequest() {
    this.requestsService.updateRequest(this.request)
      .subscribe(res => {
        if (res.data.updateEstacion.status) {
          this.router.navigate(['/solicitudes']);
        }
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Vuelva a intentarlo')
      })
  }

  imprimir(row) {
    debugger
    console.log(row)
  }

}
