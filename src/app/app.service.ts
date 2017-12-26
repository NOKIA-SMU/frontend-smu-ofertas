import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;
declare var swal: any;

@Injectable()
export class AppService {

  toAction: any;

  constructor(private router: Router) { }

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

}
