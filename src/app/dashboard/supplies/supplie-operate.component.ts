import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplie, Subsystem } from "../../models/dashboard.models";
import { SuppliesService } from './supplies.service';
import { AppService } from '../../app.service';
import { SubsystemsService } from '../subsystems/subsystems.service';

@Component({
  selector: 'app-supplie-operate',
  templateUrl: './supplie-operate.component.html',
  styleUrls: ['./supplies.component.scss']
})

export class SupplieOperateComponent implements OnInit {

  supplie: Supplie;
  isNew: boolean;
  subsystems: Subsystem[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suppliesService: SuppliesService,
    private subsystemsService: SubsystemsService,
    private appService: AppService
  ) {
    // Get subsystems
    this.subsystemsService.getSubsystems()
      .subscribe(({ data }) => {
        this.subsystems = data.subsistemas
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de subsistemas', error);
      })

    if (this.route.snapshot.params.id != 'crear') {
      this.isNew = false;
      this.suppliesService.getSupplieById(this.route.snapshot.params.id)
        .subscribe(res => {
          this.supplie = {
            id: res.data.suministro.id,
            codigoLpu: res.data.suministro.codigoLpu,
            codigoMm: res.data.suministro.codigoMm,
            nombre: res.data.suministro.nombre,
            marca: res.data.suministro.marca,
            descripcion: res.data.suministro.descripcion,
            referencia: res.data.suministro.referencia,
            unidad: res.data.suministro.unidad,
            subsistema: res.data.suministro.subsistema.id,
            valorLpu: res.data.suministro.valorLpu,
            descripcionLpu: res.data.suministro.descripcionLpu
          }
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de suministro por Id', error)
        })
    } else {

      this.supplie = {
        id: '',
        codigoLpu: '',
        codigoMm: '',
        nombre: '',
        descripcion: '',
        marca: '',
        referencia: '',
        subsistema: {
          id: '',
          nombre: '',
        },
        unidad: '',
        valorLpu: null,
        descripcionLpu: '',
        estado: null,
        subestado: null
      }
      this.isNew = true;
    }
  }

  ngOnInit() { }

  saveSupplie() {
    if (this.isNew) {
      debugger
      this.suppliesService.createSupplie(this.supplie)
        .subscribe(res => {
          this.router.navigate(['/suministros']);
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Crear suministro', error)
        })
    } else {
      debugger
      this.suppliesService.updateSupplie(this.route.snapshot.params.id, this.supplie)
        .subscribe(res => {
          this.router.navigate(['/suministros']);
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Actualización de suministro', error)
        })
    }
  }

}
