import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplie } from "../../models/dashboard.models";
import { SuppliesService } from "./supplies.service";
import { AppService } from "../../app.service";

@Component({
  selector: 'app-supplie-operate',
  templateUrl: './supplie-operate.component.html',
  styleUrls: ['./supplie-operate.component.scss']
})
export class SupplieOperateComponent implements OnInit {

  supplie: Supplie;
  isNew: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suppliesService: SuppliesService,
    private appService: AppService
  ) {
    if (this.route.snapshot.params.id != 'crear') {
      this.isNew = false;
      this.suppliesService.getSupplieById(this.route.snapshot.params.id)
        .subscribe(res => {
          this.supplie = {
            id: res.data.suministro.id,
            nombre: res.data.suministro.nombre,
            marca: res.data.suministro.marca,
            referencia: res.data.suministro.referencia,
            unidad: res.data.suministro.unidad,
            cantidad: res.data.suministro.cantidad,
            subsistema: {
              id: res.data.suministro.subsistema.id,
              nombre: res.data.suministro.subsistema.nombre,
            }
          }
        }, error => {
          debugger
        })
    } else {
      this.supplie = {
        id: '',
        nombre: '',
        marca: '',
        referencia: '',
        unidad: '',
        cantidad: null,
        subsistema: {
          id: '',
          nombre: '',
        }
      }
      this.isNew = true;
    }
  }

  ngOnInit() { }

  saveSupplie() {
    if (this.isNew) {
      this.suppliesService.createSupplie(this.supplie)
        .subscribe(res => {
          debugger
          this.router.navigate(['/suministros']);
        }, error => {
          debugger
        })
    } else {
      this.suppliesService.updateSupplie(this.route.snapshot.params.id, this.supplie)
        .subscribe(res => {
          debugger
          this.router.navigate(['/suministros']);
        }, error => {
          debugger
        })

    }
  }

}
