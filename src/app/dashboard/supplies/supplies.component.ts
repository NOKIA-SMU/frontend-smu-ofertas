import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { SuppliesService } from "./supplies.service";
import { AppService } from "../../app.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['../dashboard.component.scss', './supplies-component.scss']
})

export class SuppliesComponent implements OnInit {

  supplies: any[] = [];
  suppliesColumns = ['id', 'nombre', 'subsistema', 'marca', 'referencia', 'estado', 'subestado'];
  dataSourceSupplies = new MatTableDataSource();
  isLoadingResultsSupplies = false;
  currentRowSelect: any;
  currentRowSelectData: any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suppliesService: SuppliesService,
    private authService: AuthService,
    private appService: AppService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.suppliesService.getSupplies()
      .subscribe(res => {
        // Inicialize supplies table
        this.dataSourceSupplies = new MatTableDataSource(res.data.suministros);
        this.dataSourceSupplies.paginator = this.paginator;
        this.dataSourceSupplies.sort = this.sort;
        this.isLoadingResultsSupplies = false;
      }, error => {
        this.isLoadingResultsSupplies = false;
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de suministros', error);
      })
  }

  applyFilterSupplies(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceSupplies.filter = filterValue;
  }

  selectRow(index, data) {
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }

  goToEdit() {
    this.router.navigate([`dashboard/suministros/${this.currentRowSelectData.id}`]);
  }

  imprimir(row) {
    debugger
  }

}
