import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PermissionsFields } from './offer.data';
import { OffersService } from "./offers.service";
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../../admin/admin.service';
import { AppService } from "../../app.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['../dashboard.component.scss', 'offers.component.scss']
})

export class OffersComponent implements OnInit, AfterViewInit {

  offersColumnsDynamics: any = [];
  offersAllColumns: any = [];

  // Initialize table offers
  dataSourceOffers = new MatTableDataSource();
  isLoadingResultsOffers = true;
  currentRowSelect: any;
  currentRowSelectData: any = {};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  currentUser: any;

  permissionsFields = PermissionsFields;

  permissionsView: any = { };

  constructor(
    private offersService: OffersService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private adminService: AdminService,
    private appService: AppService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.appService.validateSecurity(this.route.snapshot.routeConfig.path, true)
      .then(res => {
        // Get permissions view
        this.permissionsView = res[0].permissionsView;
        // Get cols offer
        let data = res[1].colsOffer;
        // Loop cols offer from server
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].permissions.length; j++) {
            // Update permissionsFields object
            if (this.permissionsFields[data[i].db] === undefined) {
              debugger
            }
            this.permissionsFields[data[i].db][data[i].permissions[j].name] = data[i].permissions[j].checked;
            // Build columns array general for read
            if (data[i].permissions[j].name === 'leer' && data[i].permissions[j].checked) {
              this.offersAllColumns.push(data[i].db);
              if (data[i].own === true) this.offersColumnsDynamics.push(data[i].db)
            }
          }
        }
        // Refactor pending on future
        this.authService.currentUser()
          .subscribe(res => {
            this.currentUser = res;
            if (this.currentUser.roles) {
              this.offersService.getOffers()
                .subscribe(res => {
                  // Filter offers by rol
                  let filteredOffers = [];
                  if (this.currentUser.roles.Administrador) {
                    this.dataSourceOffers = new MatTableDataSource(res.data.ofertas);
                  } else if (this.currentUser.roles.Supervisor) {
                    for (let i = 0; i < res.data.ofertas.length; i++) {
                      if (res.data.ofertas[i].ordenSuministro) {
                        if (res.data.ofertas[i].ordenSuministro.solicitud.supervisorId == this.currentUser.id) {
                          filteredOffers.push(res.data.ofertas[i]);
                        }
                      } else if (res.data.ofertas[i].ordenServicio) {
                        if (res.data.ofertas[i].ordenServicio.solicitud.supervisorId == this.currentUser.id) {
                          filteredOffers.push(res.data.ofertas[i]);
                        }
                      }
                    }
                    this.dataSourceOffers = new MatTableDataSource(filteredOffers);
                  } else if (this.currentUser.roles.Analista) {
                    for (let i = 0; i < res.data.ofertas.length; i++) {
                      if (res.data.ofertas[i].ordenSuministro) {
                        if (res.data.ofertas[i].ordenSuministro.solicitud.analistaId == this.currentUser.id) {
                          filteredOffers.push(res.data.ofertas[i]);
                        }
                      } else if (res.data.ofertas[i].ordenServicio) {
                        if (res.data.ofertas[i].ordenServicio.solicitud.analistaId == this.currentUser.id) {
                          filteredOffers.push(res.data.ofertas[i]);
                        }
                      }
                    }
                    this.dataSourceOffers = new MatTableDataSource(filteredOffers);
                  } else {
                    this.dataSourceOffers = new MatTableDataSource(res.data.ofertas);
                  }
                  this.dataSourceOffers.paginator = this.paginator;
                  this.dataSourceOffers.sort = this.sort;
                  this.isLoadingResultsOffers = false;
                }, error => {
                  this.isLoadingResultsOffers = false;
                  this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de ofertas', error);
                });
            }
          }, error => {
            this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Consulta de usuario actual', error);
          })
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Validación de seguridad', error);
      })

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceOffers.filter = filterValue;
  }

  selectRow(index, data) {
    this.currentRowSelect = index;
    this.currentRowSelectData = data;
  }

  goToEdit() {
    this.router.navigate([`dashboard/ofertas/${this.currentRowSelectData.id}`]);
  }

  deleteOffer() {
    this.offersService.deleteOffer(this.currentRowSelectData.id)
      .subscribe(res => {
        if (res.data.deleteOferta.status === 200)
          this.router.navigate(['/ofertas']);
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Eliminar oferta', error);
      })
  }

  export() {
    localStorage.setItem('currentExport', 'offers');
    this.router.navigate(['dashboard/exportar'], { queryParams: this.currentUser.roles, skipLocationChange: true });
  }

  isArray(obj: any) {
    return Array.isArray(obj);
  }

  isObject(val: any) {
    return (typeof val === 'object');
  }

  isString(val: any) {
    return (typeof val === 'string');
  }

}

