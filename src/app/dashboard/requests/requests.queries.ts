import gql from 'graphql-tag';

export const queryPriorities = gql`
  query($uid: String, $credential: String) {
    prioridades(uid: $uid, credential: $credential)
  }
`;

export const queryRequests = gql`
  query ($uid: String, $credential: String) {
    solicitudes(uid: $uid, credential: $credential) {
      id
      supervisorId
      supervisor
      analistaId
      analista
      tas
      estacion {
        id
        nombre
      }
      subsistema {
        id
        nombre
      }
      ordenSuministros {
        id
        suministro {
          id
          nombre
        }
        cantidad
        comentario
      }
      ordenServicios {
        id
        servicio {
          id
          nombre
        }
        cantidad
        comentario
      }
      prioridad
      estadoSolicitud
      creado
      actualizado
      __typename
    }
  }
`;

export const queryRequestById = gql`
  query (
    $pk: ID!,
    $uid: String!,
    $credential: String!
  ) {
    solicitud(
      pk: $pk,
      uid: $uid,
      credential: $credential
    ){
      id
      supervisorId
      supervisor
      analistaId
      analista
      tas
      estacion {
        id
        nombre
      }
      subsistema {
        id
        nombre
      }
      ordenSuministros {
        id
        suministro {
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
        }
        cantidad
        comentario
      }
      ordenServicios {
        id
        servicio {
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
        cantidad
        comentario
      }
      prioridad
      estadoSolicitud
      creado
      actualizado
      __typename
    }
  }
`;

export const createSolicitud = gql`
  mutation (
    $supervisorId: String,
    $supervisor: String,
    $analistaId: String,
    $analista: String,
    $tas: String,
    $estacion: ID,
    $subsistema: ID,
    $suministros: [SuministroInput],
    $servicios: [ServicioInput],
    $prioridad: String,
    $estadoSolicitud: Boolean,
    $uid: String!,
    $credential: String!,
  ){
    createSolicitud(
      supervisorId: $supervisorId,
      supervisor: $supervisor,
      analistaId: $analistaId,
      analista: $analista,
      tas: $tas,
      estacion: $estacion,
      subsistema: $subsistema,
      suministros: $suministros,
      servicios: $servicios,
      prioridad: $prioridad,
      estadoSolicitud: $estadoSolicitud,
      uid: $uid,
      credential: $credential
    ) {
      solicitud {
        id
        supervisorId
        supervisor
        analistaId
        analista
        tas
        estacion {
          id
        }
        subsistema {
          id
        }
        ordenSuministros {
          id
          suministro {
            id
            nombre
          }
          cantidad
          comentario
        }
        ordenServicios {
          id
          servicio {
            id
            nombre
          }
          cantidad
          comentario
        }
        prioridad
        estadoSolicitud
      }
      status
    }
  }
`;

export const updateSolicitud = gql`
  mutation (
    $pk: ID!,
    $supervisorId: String,
    $supervisor: String,
    $analistaId: String,
    $analista: String,
    $tas: String,
    $estacion: ID,
    $subsistema: ID,
    $suministros: [SuministroInput],
    $servicios: [ServicioInput],
    $prioridad: String,
    $estadoSolicitud: Boolean,
    $uid: String!,
    $credential: String!,
  ){
    updateSolicitud(
      pk: $pk,
      supervisorId: $supervisorId,
      supervisor: $supervisor,
      analistaId: $analistaId,
      analista: $analista,
      tas: $tas,
      estacion: $estacion,
      subsistema: $subsistema,
      suministros: $suministros,
      servicios: $servicios,
      prioridad: $prioridad,
      estadoSolicitud: $estadoSolicitud,
      uid: $uid,
      credential: $credential
    ) {
      solicitud {
        id
        supervisorId
        supervisor
        analistaId
        analista
        tas
        estacion {
          id
        }
        subsistema {
          id
        }
        ordenSuministros {
          id
          suministro {
            id
            nombre
          }
          cantidad
          comentario
        }
        ordenServicios {
          id
          servicio {
            id
            nombre
          }
          cantidad
          comentario
        }
        prioridad
        estadoSolicitud
        __typename
      }
      status
    }
  }
`;

export const deleteSolicitud = gql`
  mutation($pk: ID!, $uid: String!, $credential: String!){
    deleteSolicitud(pk: $pk, uid: $uid, credential: $credential) {
      status
    }
  }
`;