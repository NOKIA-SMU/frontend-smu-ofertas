import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subsystem } from "../../models/dashboard.models";
import { SubsystemsService } from "./subsystems.service";
import { AppService } from "../../app.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-subsystem-operate',
  templateUrl: './subsystem-operate.component.html',
  styleUrls: ['./subsystems.component.scss']
})

export class SubsystemOperateComponent implements OnInit {

  id: null;
  data: any;
  subsystem: Subsystem;
  isNew: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private subsystemsService: SubsystemsService,
    private appService: AppService) {
    if (this.route.snapshot.params.id != 'crear') {
      this.isNew = false;
      this.data = this.route.snapshot.queryParams;
      this.subsystem = {
        id: this.data.id,
        nombre: this.data.nombre
      }
    } else {
      this.subsystem = {
        id: null,
        nombre: ''
      }
      this.isNew = true;
    }
  }

  ngOnInit() {
  }

  createSubsystem() {
    this.subsystemsService.createSubsystem(this.subsystem)
      .subscribe(res => {
        // if (res.data.updateEstacion.status) {
        this.router.navigate(['/subsistemas']);
        // }
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Vuelva a intentarlo')
      })
  }

  updateSubsystem() {
    this.subsystemsService.updateSubsystem(this.subsystem)
      .subscribe(res => {
        // if (res.data.updateEstacion.status) {
          this.router.navigate(['/subsistemas']);
        // }
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Vuelva a intentarlo')
      })
  }

}
