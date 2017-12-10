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
  priorities: any[];
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

    this.priorities = [
      {id: 1 , name: "Alta"},
      {id: 2 , name: "Media"},
      {id: 3 , name: "Baja"}
    ]

    if (this.route.snapshot.params.id != 'crear') {
      this.isNew = false;
      this.data = this.route.snapshot.queryParams;
      this.request = {
        id: this.data.id,
        supervisorId: this.data.supervisor.id,
        supervisor: this.data.supervisor.fullName,
        analistaId: this.data.analista.id,
        analista: this.data.analista.fullName,
        tas: this.data.tas,
        estacion: this.data.estacion,
        subsistema: this.data.subsistema,
        suministros: this.data.suministros,
        servicios: this.data.servicios,
        prioridad: this.data.prioridad,
        estadoSolicitud: this.data.estadoSolicitud
      }
    } else {
      this.request = {
        supervisorId: '',
        supervisor: '',
        analistaId: '',
        analista: '',
        tas: '',
        estacion: 0,
        subsistema: 0,
        suministros: [{ suministroId: 0, suministroQty: 0 }],
        servicios: [{ servicioId: 0, servicioQty: 0 }],
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
      if (collection[i].id === row.id) {
        return collection[i]
      }
    }
    return null
  }

  filterByIndex(row, collection) {
    for (let i = 0; i < collection.length; i++)
      if (collection[i].id === row.id)
        return i
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

  selectSubsystem(event, subsystemId) {
    this.isLoadingResultsSupplies = true;

    // Get all services
    this.servicesService.getServices(subsystemId)
      .subscribe(res => {
        for (let i = 0; i < res.data.servicios.length; i++) {
          this.services.push({ id: res.data.servicios[i].id, nombre: res.data.servicios[i].nombre, qty: 0 })
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
        for (let i = 0; i < res.data.suministros.length; i++) {
          this.supplies.push({ id: res.data.suministros[i].id, nombre: res.data.suministros[i].nombre, qty: 0 })
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

  createRequest() {
    this.request.suministros = this.currentRowSelectDataSupplies;
    this.request.servicios = this.currentRowSelectDataServices;
    this.request.analistaId = this.selectedAnalyst.id;
    this.request.analista = `${this.selectedAnalyst.firstName} ${this.selectedAnalyst.lastName}`;
    this.request.supervisorId = this.currentUser.id;
    this.request.supervisor = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    this.requestsService.createRequest(this.request)
      .subscribe(res => {
        if (res.data.createSolicitud.status == 200) {
          this.router.navigate(['/solicitudes']);
        }
      }, error => {
        debugger
        // this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Vuelva a intentarlo')
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

}
