import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Permission } from '../../models/auth.models';
import { AppService } from "../../app.service";

@Component({
  selector: "app-permissions",
  templateUrl: "./permissions.component.html",
  styleUrls: ['../admin.component.scss', './permissions.component.scss']
})

export class PermissionsComponent implements OnInit, AfterViewInit {

  // Config permissions table
  permissionColumns = ['modelo', 'permiso', 'id'];
  dataSourcePermissions = new MatTableDataSource();
  isLoadingPermissions: boolean = true;
  currentRowSelect: any;
  currentRowSelectData: any = {};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  permissions: Permission[];

  constructor(
    private adminService: AdminService,
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // Get all permissions
    this.adminService.getPermissions().subscribe(permissions => {
      this.dataSourcePermissions = new MatTableDataSource(permissions);
      this.dataSourcePermissions.paginator = this.paginator;
      this.dataSourcePermissions.sort = this.sort;
      this.isLoadingPermissions = false;
    }, error => {
      this.isLoadingPermissions = false;
      this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de permisos', error);
    });
  }

  goToCreate() {
    this.router.navigate([`admin/permisos/crear`]);
  }

  goToEdit() {
    this.router.navigate([`admin/permisos/${this.currentRowSelectData.id}`], { queryParams: this.currentRowSelectData, skipLocationChange: true });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourcePermissions.filter = filterValue;
  }

  selectRow(index, data) {
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }

  deletePermission() {
    this.adminService.deletePermission(this.currentRowSelectData)
      .then(res => {
        this.router.navigate([`admin/permisos`]);
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Eliminar permiso', error)
      });
  }

}
