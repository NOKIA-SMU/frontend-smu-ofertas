import gql from 'graphql-tag';

export const querySupplies = gql`
	query ($uid: String!, $credential:String!) {
		suministros(uid: $uid, credential: $credential) {
			id
			nombre
			subsistema {
				id
				nombre
			}
			marca
			referencia
			estado
			subestado
		}
	}
`;

export const querySuppliesById = gql`
	query ($pk: ID!, $uid:String!, $credential:String!) {
		suministro (pk: $pk, uid: $uid, credential: $credential) {
			id
			nombre
			subsistema {
				id
				nombre
			}
			marca
			referencia
			estado
			subestado
		}
	}
`;

export const querySuppliesBySubsystem = gql`
	query ($query: String, $uid: String!, $credential: String!) {
		suministros(query: $query, uid: $uid, credential: $credential) {
			id
			nombre
			subsistema {
				id
				nombre
			}
		}
	}
`;

export const mutationCreateSupplie = gql`
	mutation (
		$nombre: String,
		$marca: String,
		$referencia: String,
		$unidad: String,
		$uid: String!,
		$credential: String!
	) {
		suministros(
			nombre: $nombre,
			marca: $marca,
			referencia: $referencia,
			unidad: $unidad,
			uid: $uid,
			credential: $credential
		) {
			id
			nombre
		}
	}
`;

export const mutationUpdateSupplie = gql`
	mutation (
		$pk: ID!,
		$name: String,
		$uid: String!,
		$credential: String!
	) {
		updateSuministro(
			pk: $pk,
			nombre: $name,
			uid: $uid,
			credential: $credential
		) {
			id
			nombre
		}
	}
`;