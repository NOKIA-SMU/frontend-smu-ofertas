import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Role } from '../../models/auth.models';
import { AdminService } from '../admin.service';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['../admin.component.scss', './roles.component.scss']
})

export class RolesComponent implements OnInit {

  // Config table roles
  roleColumns = ['id', 'nombre'];
  dataSourceRoles = new MatTableDataSource();
  isLoadingRoles = true;
  currentRowSelect: any;
  currentRowSelectData: any = {};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  roles: Role[];

  constructor(
    private adminService: AdminService,
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    // Get all roles
    this.adminService.getRoles().subscribe(roles => {
      this.roles = roles;
      this.dataSourceRoles = new MatTableDataSource(roles);
      this.dataSourceRoles.paginator = this.paginator;
      this.dataSourceRoles.sort = this.sort;
      this.isLoadingRoles = false;
    }, error => {
      this.isLoadingRoles = false;
      this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de roles', error);
    });
  }

  goToCreate() {
    this.router.navigate([`admin/roles/crear`]);
  }

  goToEdit() {
    this.router.navigate([`admin/roles/${this.currentRowSelectData.id}`], { queryParams: this.currentRowSelectData, skipLocationChange: true });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceRoles.filter = filterValue;
  }

  selectRow(index, data) {
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }

  deleteRole() {
    this.adminService.deleteRole(this.currentRowSelectData)
    .then(res => {
      this.router.navigate([`admin/roles`]);
    }, error => {
      this.appService.showSwal('cancel', 'error', 'Operación sin exito', 'Eliminar role', error);
    });
  }

}
