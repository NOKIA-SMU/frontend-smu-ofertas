import gql from 'graphql-tag';

export const queryServices = gql`
	query (
		$query: String,
		$uid: String!,
		$credential:String!
	) {
		servicios (query: $query, uid: $uid, credential: $credential) {
			id
			codigoLpu
			nombre
			descripcion
			distancia
			peso
			tiempo
			subsistema {
				id
				nombre
			}
			unidad
			valorLpu
			descripcionLpu
			estado
			subestado
		}
	}
`;

export const queryServicesById = gql`
	query ($pk: ID!, $uid:String!, $credential:String!) {
		servicio (pk: $pk, uid: $uid, credential: $credential) {
			id
			codigoLpu
			nombre
			descripcion
			distancia
			peso
			tiempo
			subsistema {
				id
				nombre
			}
			unidad
			valorLpu
			descripcionLpu
			estado
			subestado
		}
	}
`;

export const mutationCreateService = gql`
	mutation (
		$codigoLpu: String!,
		$nombre: String!,
		$descripcion: String,
		$distancia: String,
		$peso: String,
		$tiempo: String,
		$subsistema: ID!,
		$unidad: String,
		$valorLpu: Float,
		$descripcionLpu: String,
		$uid: String!,
		$credential: String!
	) {
		createServicio (
			codigoLpu: $codigoLpu,
			nombre: $nombre,
			descripcion: $descripcion,
			distancia: $distancia,
			peso: $peso,
			tiempo: $tiempo,
			subsistema: $subsistema,
			unidad: $unidad,
			valorLpu: $valorLpu,
			descripcionLpu: $descripcionLpu,
			uid: $uid,
			credential: $credential
		) {
			servicio {
				id
				nombre
			}
			status
		}
	}
`;

export const mutationUpdateService = gql`
	mutation (
		$pk: ID!,
		$codigoLpu: String!,
		$nombre: String!,
		$descripcion: String,
		$distancia: String,
		$peso: String,
		$tiempo: String,
		$subsistema: ID!,
		$unidad: String,
		$valorLpu: Float,
		$descripcionLpu: String,
		$uid: String!,
		$credential: String!
	) {
		updateServicio (
			pk: $pk,
			codigoLpu: $codigoLpu,
			nombre: $nombre,
			descripcion: $descripcion,
			distancia: $distancia,
			peso: $peso,
			tiempo: $tiempo,
			subsistema: $subsistema,
			unidad: $unidad,
			valorLpu: $valorLpu,
			descripcionLpu: $descripcionLpu,
			uid: $uid,
			credential: $credential
		) {
			status
		}
	}
`;

export const mutationDeleteService = gql`
	mutation (
		$pk: ID!,
		$uid: String!,
		$credential: String!
	) {
		deleteServicio (
			pk: $pk,
			uid: $uid,
			credential: $credential
		) {
			servicio {
				id
				nombre
			}
			status
		}
	}
`;