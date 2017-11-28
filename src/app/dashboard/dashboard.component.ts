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

const queryStations = gql`
  query queryStations {
    estaciones {
      id
      nombre
      ubicacion
      region
      departamento
      ciudad
      direccion
      latitud
      longitud
      estructura
      categoria
      estado
      subestado
      creado
      actualizado
    }
  }
`;

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

  displayedColumns = [
    'id',
    'nombre',
    'ubicacion',
    'region',
    'departamento',
    'ciudad',
    'direccion',
    'latitud',
    'longitud',
    'estructura',
    'categoria'
    ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apollo: Apollo) {
    this.apollo.watchQuery<any>({
      query: queryStations
    })
      .valueChanges
      .subscribe(({ data }) => {
        this.dataSource = new MatTableDataSource(data.estaciones);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnInit() { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
