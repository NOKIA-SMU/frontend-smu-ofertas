import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminModule } from './admin/admin.module';

// Material
import { MaterialModule } from './material.module';
import { AppService } from './app.service';

//Apollo
// import { HttpHeaders } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AuthModule,
    DashboardModule,
    AdminModule,
    MaterialModule,
    HttpClientModule,
    ApolloModule
  ],
  providers: [
    AppService,
    HttpLink
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const http = httpLink.create({ uri: 'https://smu-ofertas-api.appspot.com/graphql' });

    // const auth = setContext((_, { headers }) => {
    //   // get the authentication token from local storage if it exists
    //   // const token = localStorage.getItem('token');
    //   const token = "Bearer 5151155sdfgh"
    //   // return the headers to the context so httpLink can read them
    //   // in this example we assume headers property exists
    //   // and it is an instance of HttpHeaders
    //   if (!token) {
    //     return {};
    //   } else {
    //     return {
    //       headers: headers.append('Authorization', `Bearer ${token}`)
    //     };
    //   }
    // });

    apollo.create({
      link: httpLink.create({ uri: 'https://smu-ofertas-api.appspot.com/graphql' }),
      cache: new InMemoryCache()
    });

    // apollo.create({
    //   link: auth.concat(http),
    //   cache: new InMemoryCache()
    // });
  }
}
