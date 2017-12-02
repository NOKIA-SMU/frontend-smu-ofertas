import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Station } from "../../../models/dashboard.models";
import { StationsService } from "../stations.service";
import { AppService } from "../../../app.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-station-update',
  templateUrl: './station-update.component.html',
  styleUrls: ['./station-update.component.scss']
})
export class StationUpdateComponent implements OnInit {

  id: null;
  sub: any;
  data: any;
  station: Station;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stationsService: StationsService,
    private appService: AppService) {
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
  }

  ngOnInit() {
  }

  updateStation(station: Station) {
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
