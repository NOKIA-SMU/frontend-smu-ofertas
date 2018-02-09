import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role, Profile, Permission } from './models/auth.models';
import { AuthService } from './auth/auth.service';
import { AdminService } from './admin/admin.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

declare var $: any;
declare var swal: any;

@Injectable()
export class AppService {

  toAction: any;
  currentUser: Profile;

  // Initialize vars for permissions view validate
  rolesGeneral: Role[];
  userPermissions: Permission[] = [];
  rolesUserParsed: any[] = [];
  permissionsView = {};

  // Initialize vars for cols offer validate
  userColsOffer: any = [];

  constructor(
    private router: Router,
    private adminService: AdminService,
    private authService: AuthService
  ) {
    this.authService.currentUser()
      .subscribe(res => {
        this.currentUser = res
      })
  }

  public showSwal(mod, type, title, text, error?) {
    if (mod === 'basic') {
      swal({
        title,
        buttonsStyling: false,
        confirmButtonClass: 'mat-primary'
      });
    } else if (mod === 'title-and-text') {
      swal({
        title,
        text,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-info'
      });
    } else if (mod === 'success-message') {
      swal({
        type,
        title,
        text,
        buttonsStyling: false,
        confirmButtonClass: 'mat-primary'
      });
    } else if (mod === 'cancel') {
      debugger
      if (error) {
        if (error.message == "GraphQL error: credential invalid" || error.message == "GraphQL error: are you login?") {
          title = "Credenciales invalidas";
          text = "Por favor vuelva a ingresar al sistema";
          this.toAction = "login";
          localStorage.clear();
          this.authService.deleteToken(this.currentUser.id)
            .subscribe(res => {
              this.authService.logout()
                .then(res => {
                  this.router.navigate(['/']);
                }, error => {
                  debugger
                })
            })
        }
        else if (error.message === 'Current user does not have assigned roles') {
          title = "Usted no tiene roles asignados";
          text = "Por favor contacte al administrador del sistema";
          this.toAction = "dashboard";
        }
        else if (error.message === 'Current user does not have assigned permission for columns offer') {
          title = "Usted no tiene permisos asignados para los campos de oferta";
          text = "Por favor contacte al administrador del sistema";
          this.toAction = "dashboard";
        }
        else if (error.message === 'User not found regions') {
          title = "Usted no tiene regiones asignada";
          text = "Por favor contacte al administrador del sistema";
          this.toAction = "requests";
        }
      }
      swal({
        type,
        title,
        text,
        buttonsStyling: false,
        confirmButtonClass: 'mat-primary'
      }).then(res => {
        if (this.toAction == "login") this.router.navigate(['/']);
        else if (this.toAction == "dashboard") this.router.navigate(['/dashboard']);
        else if (this.toAction == "requests") this.router.navigate(['/solicitudes']);

      })
    } else if (mod === 'custom-html') {
      swal({
        title: 'HTML example',
        buttonsStyling: false,
        confirmButtonClass: 'mat-primary',
        html:
        'You can use <b>bold text</b>, ' +
        '<a href="http://github.com">links</a> ' +
        'and other HTML tags'
      });
    } else if (mod === 'auto-close') {
      swal({
        title: 'Auto close alert!',
        text: 'I will close in 2 seconds.',
        timer: 2000,
        showConfirmButton: false
      });
    } else if (mod === 'input-field') {
      swal({
        title: 'Input something',
        html: '<div class="form-group">' +
        '<input id="input-field" type="text" class="form-control" />' +
        '</div>',
        showCancelButton: true,
        confirmButtonClass: 'mat-primary',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      }).then(function (result) {
        swal({
          type: 'success',
          html: 'You entered: <strong>' +
          $('#input-field').val() +
          '</strong>',
          confirmButtonClass: 'mat-primary',
          buttonsStyling: false

        });
      }).catch(swal.noop);
    }
  }

  // receives 2 parameters: 1 - view , 2 - boolean optional validate columns
  public validateSecurity(queryPath, validateColumns?: boolean) {
    return new Promise((resolve, reject) => {
      this.adminService.getRoles().subscribe(roles => {
        this.rolesGeneral = roles;

        this.authService.currentUser()
          .subscribe(res => {
            this.currentUser = res
            // If current user has assigned roles
            if (this.currentUser.roles) {
              // Get all roles parsed (id - name)
              this.rolesUserParsed = [];
              for (let i = 0; i < this.rolesGeneral.length; i++) {
                if (this.currentUser.roles[this.rolesGeneral[i].name]) {
                  this.rolesUserParsed.push({ name: this.rolesGeneral[i].name, id: this.rolesGeneral[i].id })
                }
              }
              if (validateColumns) {
                for (let i = 0; i < this.rolesUserParsed.length; i++) {
                  this.adminService.getColsOfferRole(this.rolesUserParsed[i])
                    .subscribe(res => {
                      // Current user does not have assigned permission for offer columns
                      if (res.length === 0) {
                        reject({
                          message: 'Current user does not have assigned permission for columns offer'
                        })
                      }
                      // Current user have assigned permissions for offer columns
                      else {
                        res.map(res => {

                          this.userColsOffer = [];
                          // Build user cols offer
                          for (let k = 0; k < res.list.length; k++) {
                            this.userColsOffer.push(res.list[k]);
                          }

                          // Get permissions by role
                          for (let i = 0; i < this.rolesUserParsed.length; i++) {
                            this.adminService.getRolePermissions(this.rolesUserParsed[i])
                              .subscribe(res => {
                                res.map(res => {
                                  this.userPermissions = [];
                                  this.permissionsView = {};
                                  // Build user permissions
                                  for (let k = 0; k < res.list.length; k++) {
                                    this.userPermissions.push(res.list[k]);
                                  }
                                  // Build permissions object for view (queryPath)
                                  for (let m = 0; m < this.userPermissions.length; m++) {
                                    if (queryPath === this.userPermissions[m].model) {
                                      this.permissionsView[this.userPermissions[m].name] = true;
                                    }
                                  }
                                  // console.log(this.permissionsView)
                                  resolve([{
                                    permissionsView: this.permissionsView
                                  },
                                    {colsOffer: this.userColsOffer
                                  }]);
                                })
                              }, error => {
                                this.showSwal('cancel', 'error', 'Operación sin exito', 'Consulta permisos del rol', error);
                              })
                          }

                        })
                      }
                    }, error => {
                      debugger
                    })

                }
              }
              else {
                // Get permissions by role
                for (let i = 0; i < this.rolesUserParsed.length; i++) {
                  this.adminService.getRolePermissions(this.rolesUserParsed[i])
                    .subscribe(res => {
                      res.map(res => {
                        this.userPermissions = [];
                        this.permissionsView = {};
                        // Build user permissions
                        for (let k = 0; k < res.list.length; k++) {
                          this.userPermissions.push(res.list[k]);
                        }
                        // Build permissions object for view (queryPath)
                        for (let m = 0; m < this.userPermissions.length; m++) {
                          if (queryPath === this.userPermissions[m].model) {
                            this.permissionsView[this.userPermissions[m].name] = true;
                          }
                        }
                        // console.log(this.permissionsView)
                        resolve(this.permissionsView);
                      })
                    }, error => {
                      this.showSwal('cancel', 'error', 'Operación sin exito', 'Consulta permisos del rol', error);
                    })
                }
              }

            }
            // Current user does not have assigned roles
            else {
              reject({
                message: 'Current user does not have assigned roles'
              })
            }
          }, error => {
            this.showSwal('cancel', 'error', 'Operación sin exito', 'Consulta usuario actual', error);
          })
      }, error => {
        this.showSwal('cancel', 'error', 'Operación sin exito', 'Consulta roles general', error);
      });
    });
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    debugger
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
