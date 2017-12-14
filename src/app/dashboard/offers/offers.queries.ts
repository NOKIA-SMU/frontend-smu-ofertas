import gql from 'graphql-tag';

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
			percioUnidadProveedor
			percioTotalProveedor
			percioUnidadVenta
			percioTotalVenta
			percioUnidadCliente
			percioTotalCliente
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
			fechaEntrgaAlmacen
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
			percioUnidadProveedor
			percioTotalProveedor
			percioUnidadVenta
			percioTotalVenta
			percioUnidadCliente
			percioTotalCliente
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
			fechaEntrgaAlmacen
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