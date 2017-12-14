import gql from 'graphql-tag';

export const queryOfferts = gql`
	query ($uid: String, $credential: String) {
		ofertas(uid: $uid, credential: $credential) {
			id
			solicitud {
				id
				supervisor
				estacion {
					nombre
					region
					departamento
					ciudad
				}
			}
			suministro {
				id
				nombre
			}
			servicio {
				id
				nombre
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
		}
	}
`;