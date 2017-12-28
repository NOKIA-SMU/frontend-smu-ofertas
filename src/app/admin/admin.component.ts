import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Profile } from '../models/auth.models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  currentUser: Profile;

  constructor(public router: Router, private authService: AuthService) {
    this.authService.currentUser()
      .subscribe(res => {
        this.currentUser = res
      })
  }

  ngOnInit() { }

  logout() {
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
