import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Station } from "../../models/dashboard.models";
import { StationsService } from "./stations.service";
import { AppService } from "../../app.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-station-operate',
  templateUrl: './station-operate.component.html',
  styleUrls: ['./stations.component.scss']
})

export class StationOperateComponent implements OnInit {

  id: null;
  data: any;
  station: Station;
  isNew: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stationsService: StationsService,
    private appService: AppService) {
    if (this.route.snapshot.params.id != 'crear') {
      this.isNew = false;
      this.data = this.route.snapshot.queryParams;
      this.station = {
        id: this.data.id,
        nombre: this.data.nombre,
        ubicacion: this.data.ubicacion,
        region: this.data.region,
        departamento: this.data.departamento,
        ciudad: this.data.ciudad,
        direccion: this.data.direccion,
        latitud: this.data.latitud,
        longitud: this.data.longitud,
        estructura: this.data.estructura,
        categoria: this.data.categoria,
      }
    } else {
      this.station = {
        id: null,
        nombre: '',
        ubicacion: '',
        region: '',
        departamento: '',
        ciudad: '',
        direccion: '',
        latitud: null,
        longitud: null,
        estructura: '',
        categoria: ''
      }
      this.isNew = true;
    }
  }

  ngOnInit() {
  }

  createStation() {
    this.stationsService.createStation(this.station)
      .subscribe(res => {
        // if (res.data.updateEstacion.status) {
          this.router.navigate(['/estaciones']);
        // }
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Vuelva a intentarlo')
      })
  }

  updateStation() {
    this.stationsService.updateStation(this.station)
      .subscribe(res => {
        if (res.data.updateEstacion.status) {
          this.router.navigate(['/estaciones']);
        }
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Vuelva a intentarlo')
      })
  }

}
