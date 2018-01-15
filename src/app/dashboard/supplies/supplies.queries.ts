import gql from 'graphql-tag';

export const querySupplies = gql`
	query ($uid: String!, $credential:String!) {
		suministros(uid: $uid, credential: $credential) {
			id
			nombre
			codigoLpu
			codigoMm
			descripcion
			unidad
			valorLpu
			descripcionLpu
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
			codigoLpu
			codigoMm
			descripcion
			unidad
			valorLpu
			descripcionLpu
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
			codigoLpu
			codigoMm
			descripcion
			unidad
			valorLpu
			descripcionLpu
			subsistema {
				id
				nombre
			}
		}
	}
`;

export const mutationCreateSupplie = gql`
	mutation (
		$codigoLpu: String!,
		$codigoMm: String!,
		$nombre: String!,
		$descripcion: String,
		$marca: String,
		$referencia: String,
		$subsistema: ID!,
		$unidad: String,
		$valorLpu: Float,
		$descripcionLpu: String,
		$uid: String!,
		$credential: String!
	) {
		createSuministro(
			codigoLpu: $codigoLpu,
			codigoMm: $codigoMm,
			nombre: $nombre,
			descripcion: $descripcion,
			marca: $marca,
			referencia: $referencia,
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

export const mutationUpdateSupplie = gql`
	mutation (
		$pk: ID!,
		$codigoLpu: String!,
		$codigoMm: String!,
		$name: String,
		$descripcion: String,
		$marca: String,
		$referencia: String,
		$subsistema: ID!,
		$unidad: String,
		$valorLpu: Float,
		$descripcionLpu: String,
		$uid: String!,
		$credential: String!
	) {
		updateSuministro(
			pk: $pk,
			codigoLpu: $codigoLpu,
			codigoMm: $codigoMm,
			nombre: $name,
			descripcion: $descripcion,
			marca: $marca,
			referencia: $referencia,
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