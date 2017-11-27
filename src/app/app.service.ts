import { Injectable } from '@angular/core';

declare var $: any;
declare var swal: any;

@Injectable()
export class AppService {

  constructor() { }

  public showSwal(type) {
    if (type === 'basic') {
      swal({
        title: 'Here is a message!',
        buttonsStyling: false,
        confirmButtonClass: 'mat-primary'
      });
    } else if (type === 'title-and-text') {
      swal({
        title: 'Here is a message!',
        text: 'It is pretty, is not it?',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-info'
      });
    } else if (type === 'success-message') {
      swal({
        type: 'success',
        title: 'Operación Exitosa',
        text: '',
        buttonsStyling: false,
        confirmButtonClass: 'mat-primary'
      });
    } else if (type === 'cancel') {
      swal({
        type: 'error',
        title: 'Operación Fallida',
        text: '',
        buttonsStyling: false,
        confirmButtonClass: 'mat-primary'
      });
    } else if (type === 'custom-html') {
      swal({
        title: 'HTML example',
        buttonsStyling: false,
        confirmButtonClass: 'mat-primary',
        html:
        'You can use <b>bold text</b>, ' +
        '<a href="http://github.com">links</a> ' +
        'and other HTML tags'
      });
    } else if (type === 'auto-close') {
      swal({
        title: 'Auto close alert!',
        text: 'I will close in 2 seconds.',
        timer: 2000,
        showConfirmButton: false
      });
    } else if (type === 'input-field') {
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
