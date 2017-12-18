import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from './services.service';
import { Service, Subsystem } from '../../models/dashboard.models';
import { SubsystemsService } from '../subsystems/subsystems.service';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-service-operate',
  templateUrl: './service-operate.component.html',
  styleUrls: ['./services.component.scss']
})

export class ServiceOperateComponent implements OnInit {

  service: Service;
  isNew: boolean;
  subsystems: Subsystem[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServicesService,
    private subsystemService: SubsystemsService,
    private appService: AppService
  ) {
    // Get subsystems
    this.subsystemService.getSubsystems()
      .subscribe(({ data }) => {
        this.subsystems = data.subsistemas
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de subsistemas', error);
      })

    if (this.route.snapshot.params.id != 'crear') {
      this.isNew = false;
      this.serviceService.getServiceById(this.route.snapshot.params.id)
        .subscribe(res => {
          this.service = {
            id: res.data.servicio.id,
            nombre: res.data.servicio.nombre,
            subsistema: res.data.servicio.subsistema.id
          }
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Subsistema por Id', error);
        })
    } else {
      this.service = {
        nombre: '',
        subsistema: {
          id: '',
          nombre: '',
        }
      }
      this.isNew = true;
    }
  }

  ngOnInit() { }

  saveService() {
    if (this.isNew) {
      this.serviceService.createService(this.service)
        .subscribe(res => {
          this.router.navigate(['/servicios']);
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Crear servicio', error);
        })
    } else {
      this.serviceService.updateService(this.route.snapshot.params.id, this.service)
        .subscribe(res => {
          this.router.navigate(['/servicios']);
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Actualización de servicio', error);
        })
    }
  }

}
