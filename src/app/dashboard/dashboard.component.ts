import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Profile } from '../models/auth.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  currentUser: Profile;

  constructor(public router: Router, private authService: AuthService) {
    this.authService.currentUser()
      .subscribe(res => {
        this.currentUser = res
      })
  }

  ngOnInit() { }

}
