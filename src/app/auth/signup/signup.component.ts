import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Profile } from '../../models/auth.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.scss']
})

export class SignupComponent implements OnInit {

  user: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  onSubmit(user: Profile) {
    this.authService.signIn(this.user).then(
      res => {
        user.userId = res.uid;
        this.authService.createUser(user)
          .then(res => {
            this.router.navigate(['dashboard']);
          }, error => {
            // debugger;
          });
      }, error => {
        // debugger;
      }
    );
  }
}

