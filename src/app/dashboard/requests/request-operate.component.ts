import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Request, Subsystem } from "../../models/dashboard.models";
import { RequestsService } from "./requests.service";
import { SubsystemsService } from "../subsystems/subsystems.service";
import { AppService } from "../../app.service";
import { Observable } from "rxjs/Observable";

import { Profile } from '../../models/auth.models';
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../../admin/admin.service';
import { StationsService } from "../stations/stations.service";

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

  id: number;
  data: any;
  request: Request;
  isNew: boolean;
  subsystems: Subsystem[];
  supplies: any[];
  services: any[];
  priorities: any[];
  checkedRequestState: boolean = false;
  currentUser: Profile;
  selectedAnalyst: any = {};
  analysts: any;

  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  currentRowSelect: any;
  currentRowSelectData: any = {}

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
    private appService: AppService
  ) {
    this.subsystemService.getSubsystems()
      .subscribe(({ data }) => {
        this.subsystems = data.subsistemas
      }, error => {
        debugger
      })

    this.authService.getToken()
      .then(res => {
      }, error => {
        debugger
      })

    this.adminService.getProfilesAnalysts()
      .subscribe(res => {
        this.analysts = res;
      })

    this.supplies = [
      {id: 1 , name: "suministro 1"},
      {id: 2 , name: "suministro 2"},
      {id: 3 , name: "suministro 3"},
      {id: 4 , name: "suministro 4"},
      {id: 5 , name: "suministro 5"}
    ]

    this.services = [
      {id: 1 , name: "servicio 1"},
      {id: 2 , name: "servicio 2"},
      {id: 3 , name: "servicio 3"},
      {id: 4 , name: "servicio 4"},
      {id: 5 , name: "servicio 5"}
    ]

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
        supervisorId: null,
        supervisor: null,
        analistaId: null,
        analista: null,
        tas: null,
        estacion: null,
        subsistema: null,
        suministros: null,
        servicios: null,
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

  createRequest() {
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
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Vuelva a intentarlo')
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
