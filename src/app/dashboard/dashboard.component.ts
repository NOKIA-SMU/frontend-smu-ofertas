import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const queryProducts = gql`
  query queryProducts {
    categories {
      id
    name
    typeCategory
    created
    updated
    }
  }
`;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading: boolean;
  currentUser: any;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: queryProducts
    })
      .valueChanges
      .subscribe(({ data }) => {
        debugger
        this.loading = data.loading;
        this.currentUser = data.currentUser;
      });
  }

}
