import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { SubsystemsService } from "./subsystems.service";
import { AppService } from "../../app.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-subsystems',
  templateUrl: './subsystems.component.html',
  styleUrls: ['../dashboard.component.scss', './subsystems.component.scss']
})

export class SubsystemsComponent implements OnInit {

  displayedColumns = ['id', 'nombre'];
  dataSourceSubsystems = new MatTableDataSource();
  isLoadingResultsSubsystems = true;
  currentRowSelect: any;
  currentRowSelectData: any = {};

  permissionsView = {
    crear: null,
    leer: null,
    editar: null,
    eliminar: null,
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private subsystemsService: SubsystemsService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {
    this.appService.validateSecurity(this.route.snapshot.routeConfig.path)
      .then(res => {
        this.permissionsView = {
          crear: res['crear'] || null,
          leer: res['leer'] || null,
          editar: res['editar'] || null,
          eliminar: res['eliminar'] || null
        }
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Validación de seguridad', error);
      })
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.subsystemsService.getSubsystems()
      .subscribe(res => {
        this.dataSourceSubsystems = new MatTableDataSource(res.data.subsistemas);
        this.dataSourceSubsystems.paginator = this.paginator;
        this.dataSourceSubsystems.sort = this.sort;
        this.isLoadingResultsSubsystems = false;
      }, error => {
        this.isLoadingResultsSubsystems = false;
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de subsistemas', error);
      });
  }

  applyFilterServices(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceSubsystems.filter = filterValue;
  }

  selectRow(index, data) {
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }

  goToEdit() {
    this.router.navigate([`dashboard/subsistemas/${this.currentRowSelectData.id}`], { queryParams: this.currentRowSelectData, skipLocationChange: true });
  }

  goToCreate() {
    this.router.navigate([`dashboard/subsistemas/crear`]);
  }

  deleteSubsystem() {
    this.subsystemsService.deleteSubsystem(this.currentRowSelectData.id)
      .subscribe(res => {
        // if (res.data.updateEstacion.status) {
        // this.router.navigate(['/estaciones']);
        // }
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Vuelva a intentarlo');
      })
  }

}
