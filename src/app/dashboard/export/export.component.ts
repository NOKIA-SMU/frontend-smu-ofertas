import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from '../requests/requests.service';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})

export class ExportComponent implements OnInit {

  data: any;
  requests: any;

  columnsRequest = [
    {name: 'id', checked: false},
    {name: 'supervisor', checked: false},
    {name: 'analista', checked: false},
    {name: 'tas', checked: false},
    {name: 'estacion', checked: false},
    {name: 'subsistema', checked: false},
    {name: 'prioridad', checked: false},
    {name: 'estadoSolicitud', checked: false}
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestsService: RequestsService,
    private appService: AppService
  ) {
    // this.appService.exportAsExcelFile
    debugger
    this.data = this.route.snapshot.queryParams;
  }

  ngOnInit() {
    this.requestsService.getRequests()
      .subscribe(res => {
        this.requests = res.data.solicitudes;
        // Filter requests by rol
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de solicitudes', error);
      });
  }

  selectColRequest(item) {
    item.checked = !item.checked;
  }

  fieldsRequestSelected: any[] = [];
  dataBuildRequests: any = [];

  exportRequests() {
    this.dataBuildRequests = [];
    // Extract columns selected for request
    for (let i = 0; i < this.columnsRequest.length; i++) {
      if (this.columnsRequest[i].checked) {
        this.fieldsRequestSelected.push(this.columnsRequest[i].name);
      }
    }
    // Build requests array filtering by selected columns
    for (let j = 0; j < this.requests.length; j++) {
      let tempData = {};
      for (let k = 0; k < this.fieldsRequestSelected.length; k++) {
        if (this.fieldsRequestSelected[k] === 'estacion' || this.fieldsRequestSelected[k] === 'subsistema')
          tempData[this.fieldsRequestSelected[k]] = this.requests[j][this.fieldsRequestSelected[k]].nombre;
        else
          tempData[this.fieldsRequestSelected[k]] = this.requests[j][this.fieldsRequestSelected[k]];
      }
      this.dataBuildRequests.push(tempData);
    }
    this.appService.exportAsExcelFile(this.dataBuildRequests, 'solicitudes');
  }

}
