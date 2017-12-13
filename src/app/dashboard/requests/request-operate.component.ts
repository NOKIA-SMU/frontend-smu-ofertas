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

  // id: number;
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
  suppliesColumns = ['activo', 'id', 'nombre', 'cantidad'];
  dataSourceSupplies = new MatTableDataSource();
  isLoadingResultsSupplies = false;
  selectionSupplies = new SelectionModel(true, []);

  services: any[] = [];
  servicesColumns = ['activo', 'id', 'nombre', 'cantidad'];
  dataSourceServices = new MatTableDataSource();
  isLoadingResultsServices = false;
  selectionServices = new SelectionModel(true, []);

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
      }, error => {
        debugger
      })
  }

  ngOnInit() {

    this.authService.currentUser()
      .subscribe(res => {
        this.currentUser = res
        if (this.currentUser.region) {
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
        }
        else {
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Este usuario no tiene asignada una región')
        }
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

          // Get supplies
          this.supplies = [];
          this.suppliesService.getSupplies(this.request.subsistema)
            .subscribe(res => {
              // Clone response
              for (let i = 0; i < res.data.suministros.length; i++) {
                this.supplies.push({ id: res.data.suministros[i].id, nombre: res.data.suministros[i].nombre })
              }
              // Update and change data by request data
              for (let i = 0; i < this.supplies.length; i++) {
                for (let j = 0; j < this.request.suministros.length; j++) {
                  if (this.supplies[i].id === this.request.suministros[j].id) {
                    this.supplies[i].qty = this.request.suministros[j].cantidad;
                    this.selectionSupplies.toggle(this.supplies[i]);
                  }
                }
              }
              // Inicialize supplies table
              this.dataSourceSupplies = new MatTableDataSource(this.supplies);
              this.dataSourceSupplies.paginator = this.paginator;
              this.dataSourceSupplies.sort = this.sort;
              this.isLoadingResultsSupplies = false;
            }, error => {
              debugger
            })

          // Get services
          this.services = [];
          this.servicesService.getServices(this.request.subsistema)
            .subscribe(res => {
              // Clone response
              for (let i = 0; i < res.data.servicios.length; i++) {
                this.services.push({ id: res.data.servicios[i].id, nombre: res.data.servicios[i].nombre })
              }
              // Update and change data by request data
              for (let i = 0; i < this.services.length; i++) {
                for (let j = 0; j < this.request.servicios.length; j++) {
                  if (this.services[i].id === this.request.servicios[j].id) {
                    this.services[i].qty = parseInt(this.request.servicios[j].cantidad);
                    this.selectionServices.toggle(this.services[i]);
                  }
                }
              }
              // Inicialize services table
              this.dataSourceServices = new MatTableDataSource(this.services);
              this.dataSourceServices.paginator = this.paginator;
              this.dataSourceServices.sort = this.sort;
              this.isLoadingResultsServices = false;
            }, error => {
              debugger
            })


        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Vuelva a intentarlo', error);
        })
    }
    if (this.route.snapshot.params.id == 'crear') {
      this.selectedAnalyst = { };
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

  ngAfterViewInit() {  }

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

  selectSubsystem(event, subsystemId) {
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
        // Clone response
        for (let i = 0; i < res.data.suministros.length; i++) {
          this.supplies.push({ id: res.data.suministros[i].id, nombre: res.data.suministros[i].nombre, qty: 0 })
        }
        // Inicialize supplies table
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
    if (analyst.lastName)
      this.request.analista = `${analyst.firstName} ${analyst.lastName}`;
    else
      this.request.analista = analyst.firstName;
    this.request.analistaId = analyst.id;
  }

  normalizeList(collection) {
    const tmpArray = []
    for (let i = 0; i < collection.length; i++) {
      collection[i].id = parseInt(collection[i].id);
      tmpArray.push({ pk: collection[i].id, qty: collection[i].qty })
    }
    return tmpArray
  }

  saveRequest() {
    if (this.selectionSupplies.selected.length > 0) this.request.suministros = this.normalizeList(this.selectionSupplies.selected);
    if (this.selectionServices.selected.length > 0) this.request.servicios = this.normalizeList(this.selectionServices.selected);
    this.request.supervisorId = this.currentUser.id;
    this.request.supervisor = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    if (this.isNew) {
      this.requestsService.createRequest(this.request)
        .subscribe(res => {
          if (res.data.createSolicitud.status == 200) {
            this.router.navigate(['/solicitudes']);
          }
        }, error => {
          debugger
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Vuelva a intentarlo');
        })
      } else {
        this.requestsService.updateRequest(this.route.snapshot.params.id, this.request)
        .subscribe(res => {
          if (res.data.updateSolicitud.status == 200) {
            this.router.navigate(['/solicitudes']);
          }
        }, error => {
          debugger
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Vuelva a intentarlo');
        })
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.dataSource.data.forEach(row => this.selectionSupplies.select(row));
  }

}
