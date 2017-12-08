import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Profile } from '../../models/auth.models';
import { Router } from '@angular/router';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.scss']
})

export class SignupComponent implements OnInit {

  user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private appService: AppService) { }

  ngOnInit() {
  }

  onSubmit(user: Profile) {
    this.authService.signIn(this.user).then(
      res => {
        let userAuth = { uid: res.uid, token: res.pa };
        localStorage.setItem('userAuth', JSON.stringify(userAuth));
        this.user.id = res.uid;
        this.authService.createUser(user, res.uid)
          .then(res => {
            let userAuth = JSON.parse(localStorage.getItem('userAuth'));
            this.authService.sendToken(userAuth.uid, userAuth.token)
              .subscribe(res => {
                this.router.navigate(['dashboard']);
              }, error => {
                this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Credenciales no recibidas')
              })
          }, error => {
            this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Perfil no fue creado')
          });
      }, error => {
        this.appService.showSwal('cancel', 'error', 'Operación no exitosa', 'Usuario no fue creado')
      }
    );
  }
}

