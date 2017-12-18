import gql from 'graphql-tag';

export const queryServices = gql`
	query ($query: String, $uid: String!, $credential:String!) {
		servicios (query: $query, uid: $uid, credential: $credential) {
			id
			nombre
			subsistema {
				id
				nombre
			}
			estado
			subestado
		}
	}
`;

export const queryServicesById = gql`
	query ($pk: ID!, $uid:String!, $credential:String!) {
		servicio (pk: $pk, uid: $uid, credential: $credential) {
			id
			nombre
			subsistema {
				id
				nombre
			}
			estado
			subestado
		}
	}
`;

export const mutationCreateService = gql`
	mutation (
		$nombre: String,
		$uid: String!,
		$credential: String!
	) {
		servicios (
			nombre: $nombre,
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
		$name: String,
		$uid: String!,
		$credential: String!
	) {
		updateServicio (
			pk: $pk,
			nombre: $name,
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

export const mutationDeleteService = gql`
	mutation (
		$pk: ID!,
		$uid: String!,
		$credential: String!
	) {
		updateServicio (
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