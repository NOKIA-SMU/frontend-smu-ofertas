import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role, Profile, Permission } from './models/auth.models';
import { AuthService } from './auth/auth.service';
import { AdminService } from './admin/admin.service';


declare var $: any;
declare var swal: any;

@Injectable()
export class AppService {

  toAction: any;
  currentUser: Profile;

  rolesGeneral: Role[];
  userPermissions: Permission[] = [];
  rolesUserParsed: any[] = [];

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
      }
      swal({
        type,
        title,
        text,
        buttonsStyling: false,
        confirmButtonClass: 'mat-primary'
      }).then(res => {
        if (this.toAction == "login") this.router.navigate(['/']);
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

  public validateSecurity(queryPath, permissionsView: {}) {
    var promise = new Promise((resolve, reject) => {
      this.adminService.getRoles().subscribe(roles => {
        this.rolesGeneral = roles;

        this.authService.currentUser()
          .subscribe(res => {
            this.currentUser = res
            // Get all roles parsed (id - name)
            for (let i = 0; i < this.rolesGeneral.length; i++) {
              if (this.currentUser.roles[this.rolesGeneral[i].name]) {
                this.rolesUserParsed.push({ name: this.rolesGeneral[i].name, id: this.rolesGeneral[i].id })
              }
            }
            // Get permissions by role
            for (let i = 0; i < this.rolesUserParsed.length; i++) {
              this.adminService.getRolePermissions(this.rolesUserParsed[i])
                .subscribe(res => {
                  res.map(res => {
                    for (let k = 0; k < res.list.length; k++) {
                      this.userPermissions.push(res.list[k]);
                    }
                    for (let m = 0; m < this.userPermissions.length; m++) {
                      if (queryPath === this.userPermissions[m].model) {
                        permissionsView[this.userPermissions[m].name] = true;
                      }
                    }
                    // return permissionsView;
                    resolve(permissionsView);
                  })
                }, error => {
                  this.showSwal('cancel', 'error', 'Operación sin exito', 'Consulta permisos del rol', error);
                })
            }
          }, error => {
            this.showSwal('cancel', 'error', 'Operación sin exito', 'Consulta usuario actual', error);
          })
      }, error => {
        this.showSwal('cancel', 'error', 'Operación sin exito', 'Consulta roles general', error);
      });
    });
    return promise;
  }

}
