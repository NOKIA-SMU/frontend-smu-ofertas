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
      suministros {
        id
        nombre
      }
      servicios {
        id
        nombre
      }
      prioridad
      estadoSolicitud
    }
  }
`;

export const queryRequestById = gql`
  query (
    $pk: ID,
    $uid: String,
    $credential: String
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
      suministros {
        id
        nombre
        cantidad
      }
      servicios {
        id
        nombre
        cantidad
      }
      prioridad
      estadoSolicitud
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
    $uid: String,
    $credential: String,
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
        suministros {
          id
        }
        servicios {
          id
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
    $pk: ID,
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
    $uid: String,
    $credential: String,
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
        suministros {
          id
        }
        servicios {
          id
        }
        prioridad
        estadoSolicitud
      }
      status
    }
  }
`;

export const deleteSolicitud = gql`
  mutation($pk: ID){
    deleteSolicitud(id: $pk) {
      estacion {
        id
      }
      status
    }
  }
`;