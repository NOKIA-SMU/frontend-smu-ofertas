import gql from 'graphql-tag';

export const queryStations = gql`
	query (
		$query: String,
		$uid: String!,
		$credential: String!
	) {
		estaciones(
			query: $query,
			uid: $uid,
			credential: $credential
		) {
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

export const mutationCreateStation = gql`
	mutation(
		$name: String,
		$ubication: String,
		$region: String,
		$departament: String,
		$city: String,
		$address: String,
		$lat: Float,
		$lon: Float,
		$estructura: String,
		$category: String,
		$uid: String!,
		$credential: String!
	) {
		createEstacion(
			nombre: $name,
			ubicacion: $ubication,
			region: $region,
			departamento: $departament,
			ciudad: $city,
			direccion: $address,
			latitud: $lat,
			longitud: $lon,
			estructura: $estructura,
			categoria: $category,
			uid: $uid,
			credential: $credential
		) {
			estacion {
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
			}
		}
	}
`;

export const mutationUpdateStation = gql`
	mutation(
		$pk: ID!,
		$name: String,
		$ubication: String,
		$region: String,
		$departament: String,
		$city: String,
		$address: String,
		$lat: Float,
		$lon: Float,
		$structure: String,
		$category: String,
		$uid: String!,
		$credential: String!
	) {
		updateEstacion(
			pk: $pk,
			nombre: $name,
			ubicacion: $ubication,
			region: $region,
			departamento: $departament,
			ciudad: $city,
			direccion: $address,
			latitud: $lat,
			longitud: $lon,
			estructura: $structure,
			categoria: $category,
			uid: $uid,
			credential: $credential
		) {
			estacion {
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
			}
			status
		}
	}
`;

export const mutationDeleteStation = gql`
	mutation(
		$pk: ID!,
		$uid: String!,
		$credential: String!
	) {
		deleteEstacion(
			pk: $pk,
			uid: $uid,
			credential: $credential
		) {
			estacion {
				id
			}
			status
		}
	}
	`