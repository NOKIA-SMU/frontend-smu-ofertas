import gql from 'graphql-tag';

export const querySubsystems = gql`
  query(
		$uid: String!,
		$credential: String!
	) {
    subsistemas (
			uid: $uid,
			credential: $credential
		) {
      id
      nombre
    }
  }
`;

export const mutationCreateSubsystem = gql`
	mutation (
		$name: String,
		$uid: String!,
		$credential: String!
	) {
		createSubsistema(
			nombre: $name,
			uid: $uid,
			credential: $credential
		) {
			subsistema {
				id
				nombre
			}
			status
		}
	}
`;

export const mutationUpdateSubsystem = gql`
	mutation (
		$pk: ID!,
		$name: String,
		$uid: String!,
		$credential: String!
	) {
		updateSubsistema(
			pk: $pk,
			nombre: $name,
			uid: $uid,
			credential: $credential
		) {
			subsistema {
				id
				nombre
			}
			status
		}
	}
`;

export const mutationDeleteSubsystem = gql`
	mutation (
		$pk: ID!,
		$uid: String!,
		$credential: String!
	) {
		deleteSubsistema(
			pk: $pk,
			uid: $uid,
			credential: $credential
		) {
			subsistema {
				id
				nombre
			}
			status
		}
	}
`;