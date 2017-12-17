import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { SubsystemsService } from "./subsystems.service";
import { AppService } from "../../app.service";


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-subsystems',
  templateUrl: './subsystems.component.html',
  styleUrls: ['../dashboard.component.scss', './subsystems.component.scss']
})

export class SubsystemsComponent implements OnInit {

  displayedColumns = [
    'id',
    'nombre'
  ];

  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  currentRowSelect: any;
  currentRowSelectData: any = {}

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private subsystemsService: SubsystemsService,
    private router: Router,
    private appService: AppService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.subsystemsService.getSubsystems()
      .subscribe(({ data }) => {
        this.dataSource = new MatTableDataSource(data.subsistemas);
        this.isLoadingResults = false;
        this.dataSource.sort = this.sort;
      }, error => {
        this.isLoadingResults = false;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Vuelva a intentarlo')
      })
  }

  imprimir(row) {
    debugger
  }

}
