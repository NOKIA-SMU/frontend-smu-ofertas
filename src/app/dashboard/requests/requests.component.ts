import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { RequestsService } from "./requests.service";
import { AuthService } from '../../auth/auth.service';
import { AppService } from "../../app.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['../dashboard.component.scss', './requests.component.scss']
})

export class RequestsComponent implements OnInit {

  displayedColumns = [
    'id',
    'supervisor',
    'analista',
    'tas',
    'estacion',
    'subsistema',
    // 'ordenSuministros',
    // 'ordenSuministrosCantidad',
    // 'ordenSuministrosComentario',
    // 'ordenServicios',
    // 'ordenServiciosCantidad',
    // 'ordenServiciosComentario',
    'prioridad',
    'estadoSolicitud'
  ];

  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  currentRowSelect: any;
  currentRowSelectData: any = {};
  public currentUser: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private requestsService: RequestsService,
    private router: Router,
    public authService: AuthService,
    private appService: AppService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.authService.currentUser()
      .subscribe(res => {
        this.currentUser = res;
        console.log(res)
      }, error => {
        debugger
      })
    this.requestsService.getRequests()
      .subscribe(res => {
        debugger
        let filteredRequests = [];
        if (this.currentUser.roles.Administrador) {
          this.dataSource = new MatTableDataSource(res.data.solicitudes);
        } else if (this.currentUser.roles.Supervisor) {
          for (let i = 0; i <= res.data.solicitudes.length; i++) {
            if (this.currentUser.supervisorId == res.data.solicitudes[i].id) {

            }
          }
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      }, error => {
        this.isLoadingResults = false;
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de solicitudes', error);
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  selectRow(index, data) {
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }

  goToEdit() {
    this.router.navigate([`dashboard/solicitudes/${this.currentRowSelectData.id}`]);
  }

  goToCreate() {
    this.router.navigate([`dashboard/solicitudes/crear`]);
  }

  deleteRequest() {
    this.requestsService.deleteRequest(this.currentRowSelectData.id)
      .subscribe(res => {
        if (res.data.deleteSolicitud.status == 200)
          this.router.navigate(['/solicitudes']);
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Eliminar solicitud', error);
      })
  }

  isArray(obj: any) {
    return Array.isArray(obj);
  }

  imprimir(row) {
    debugger
  }

}
