import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request, Subsystem } from "../../models/dashboard.models";
import { RequestsService } from "./requests.service";
import { SubsystemsService } from "../subsystems/subsystems.service";
import { AppService } from "../../app.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-request-operate',
  templateUrl: './request-operate.component.html',
  styleUrls: ['./requests.component.scss']
})

export class RequestOperateComponent implements OnInit {

  id: number;
  data: any;
  request: Request;
  isNew: boolean;
  subsystems: Subsystem[];
  supplies: any[];
  services: any[];
  priorities: any[];
  color = 'accent';
  checkedRequestState = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestsService: RequestsService,
    private subsystemService: SubsystemsService,
    private appService: AppService
  ) {
    this.subsystemService.getSubsystems()
      .subscribe(({ data }) => {
        this.subsystems = data.subsistemas
      }, error => {
        debugger
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
        supervisor: this.data.supervisor,
        analista: this.data.analista,
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
        supervisor: null,
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

  createRequest() {
    this.requestsService.createRequest(this.request)
      .subscribe(res => {
        // if (res.data.updateEstacion.status) {
        this.router.navigate(['/solicitudes']);
        // }
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
