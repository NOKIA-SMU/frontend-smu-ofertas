import { Component, OnInit, ViewChild  } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

export interface Station {
  nombre: string,
  ubicacion_tecnica: string,
  region: string,
  departamento: string,
  ciudad: string,
  direccion: string,
  estructura: string,
  latitud: string,
  longitud: string,
  categoria: string
}

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

  displayedColumns = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  loading: boolean;
  currentUser: any;

  constructor(private apollo: Apollo) {
    const users: any[] = [];
    for (let i = 1; i <= 100; i++) { users.push(this.createNewUser(i)); }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: queryProducts
    })
      .valueChanges
      .subscribe(({ data }) => {
        // debugger
        this.loading = data.loading;
        this.currentUser = data.currentUser;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /** Builds and returns a new User. */
  createNewUser(id: number) {
    const name = 'pepito';
    return {
      id: id.toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: 'red'
    };
  }
}
