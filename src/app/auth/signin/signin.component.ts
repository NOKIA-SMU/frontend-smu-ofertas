import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  user: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  loginUser() {
    this.authService.login(this.user).then(res => {
      debugger
    }, error => {

      debugger
    })
  }

}
