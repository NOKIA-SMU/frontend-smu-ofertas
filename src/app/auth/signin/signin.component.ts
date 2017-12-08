import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../auth.component.scss']
})

export class SigninComponent implements OnInit {

  user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private appService: AppService) { }

  ngOnInit() { }

  loginUser() {
    this.authService.login(this.user).then(res => {
      let userAuth = { uid: res.uid, token: res.pa };
      localStorage.setItem('userAuth', JSON.stringify(userAuth));
      this.authService.updateToken(res.uid, res.pa)
        .subscribe(res => {
          this.user.email = this.user.password = '';
          this.router.navigate(['dashboard']);
        }, error => {
          this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Credenciales no actualizadas')
        })
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Usuario o contraseña incorrecta')
      }
    )
  }

}
