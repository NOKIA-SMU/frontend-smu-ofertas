import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../auth.component.scss']
})

export class SigninComponent implements OnInit {

  user: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.authService.login(this.user).then(res => {
      this.user.email = this.user.password = '';
      this.router.navigate(['admin']);
    }, error => {

      debugger
    })
  }

}
