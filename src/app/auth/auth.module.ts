import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth.routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { AuthService } from './auth.service';

// Material
import { MaterialModule } from '../material.module';

import { environment } from '../../environments/environment';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
  ],
  declarations: [
    AuthComponent,
    SignupComponent,
    SigninComponent,
    WelcomeComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})

export class AuthModule { }
