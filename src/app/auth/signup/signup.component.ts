import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Profile } from '../../models/auth.models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  user: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {
  }

  onSubmit(user: Profile) {
    this.authService.signIn(this.user).then(
      res => {
        user.userId = res.uid;
        this.authService.createUser(user)
          .then(res => {
            // debugger;
          },
          error => {
            // debugger;
          });
      },
      error => {
        // debugger;
      }
    );
  }
}

