import gql from 'graphql-tag';

export const queryOfferTypes = gql`
	query($uid:String, $credential:String) {
		tipoOfertas(uid: $uid, credential: $credential)
	}
`;

export const queryConfirmationsReceived = gql`
	query($uid:String, $credential:String) {
		confirmacionRecibido(uid: $uid, credential: $credential)
	}
`;

export const querySubstatesOffer = gql`
	query($uid:String, $credential:String) {
		subestadoOferta (uid: $uid, credential: $credential)
	}
`;

export const queryStatesOffer = gql`
	query($uid:String, $credential:String) {
		estadoOferta (uid: $uid, credential: $credential)
	}
`;

export const queryModalities = gql`
	query($uid:String, $credential:String) {
		modalidad (uid: $uid, credential: $credential)
	}
`;

export const queryTypesClientResponse = gql`
	query($uid:String, $credential:String) {
		tipoRespuestaCliente (uid: $uid, credential: $credential)
	}
`;





export const queryOfferts = gql`
	query ($uid: String, $credential: String) {
		ofertas(uid: $uid, credential: $credential) {
			id
			solicitud {
				id
				supervisor
				estacion {
					id
					nombre
					region
					departamento
					ciudad
					__typename
				}
				__typename
			}
			suministro {
				id
				nombre
				__typename
			}
			servicio {
				id
				nombre
				__typename
			}
			cantidad
			tipoOferta
			tarea
			descripcionTarea
			encargadoCliente
			fechaEjecucion
			confirmacionRecibido
			comentarioSupervisor
			subestadoOferta
			estadoOferta
			usuario
			numeroOferta
			modalidad
			precioUnidadProveedor
			precioTotalProveedor
			precioUnidadVenta
			precioTotalVenta
			precioUnidadCliente
			precioTotalCliente
			margen
			tipoAdquisicion
			fechaRecibidoCliente
			fechaDespachoSupervisor
			fechaDespachoCompras
			fechaRespuestaCompras
			fechaEnvioCliente
			fechaRespuestaCliente
			tipoRespuestaCliente
			po
			fechaPo
			comentarioAnalista
			fechaEntregaAlmacen
			comentarioAlmacenista
			comentarioCoordinador
			valorConciliadoCliente
			fechaConciliadoCliente
			comentarioFacturador
			fechaEnvioActaSmu
			comentarioActa
			fechaFirmaActaSmu
			fechaGrSmu
			__typename
		}
	}
`;

export const queryOfferById = gql`
	query ($pk: Int, $uid: String, $credential: String) {
		oferta(pk: $pk, uid: $uid, credential: $credential) {
			id
			solicitud {
				id
				supervisor
				estacion {
					id
					nombre
					region
					departamento
					ciudad
					__typename
				}
				__typename
			}
			suministro {
				id
				nombre
				__typename
			}
			servicio {
				id
				nombre
				__typename
			}
			cantidad
			tipoOferta
			tarea
			descripcionTarea
			encargadoCliente
			fechaEjecucion
			confirmacionRecibido
			comentarioSupervisor
			subestadoOferta
			estadoOferta
			usuario
			numeroOferta
			modalidad
			precioTotalProveedor
			precioUnidadVenta
			precioTotalVenta
			precioUnidadCliente
			precioTotalCliente
			margen
			tipoAdquisicion
			fechaRecibidoCliente
			fechaDespachoSupervisor
			fechaDespachoCompras
			fechaRespuestaCompras
			fechaEnvioCliente
			fechaRespuestaCliente
			tipoRespuestaCliente
			po
			fechaPo
			comentarioAnalista
			fechaEntregaAlmacen
			comentarioAlmacenista
			comentarioCoordinador
			valorConciliadoCliente
			fechaConciliadoCliente
			comentarioFacturador
			fechaEnvioActaSmu
			comentarioActa
			fechaFirmaActaSmu
			fechaGrSmu
			__typename
		}
	}
`;