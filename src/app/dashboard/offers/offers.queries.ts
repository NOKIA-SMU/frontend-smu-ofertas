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




export const queryOffers = gql`
	query ($uid: String, $credential: String) {
		ofertas(uid: $uid, credential: $credential) {
			id
			orden {
				id
				cantidad
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
				__typename
			}
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

export const updateOferta = gql`
	mutation (
		$pk: ID!,
		$solicitud: ID!,
    $suministro: ID,
    $servicio: ID,
		$cantidad: Int,
		$tipoOferta: String,
		$tarea: String,
		$descripcionTarea: String,
		$uid: String,
		$credential: String,
		$encargadoCliente: String,
		$fechaEjecucion: Date,
		$confirmacionRecibido: String,
		$comentarioSupervisor: String,
		$subestadoOferta:String,
		$estadoOferta:String,
		$usuario:String,
		$numeroOferta:String,
		$modalidad:String,
		$precioUnidadProveedor: Float,
		$precioTotalProveedor: Float,
		$precioUnidadVenta: Float,
		$precioTotalVenta: Float,
		$precioUnidadCliente: Float,
		$precioTotalCliente: Float,
		$margen: Int,
		$tipoAdquisicion: String,
		$fechaRecibidoCliente: Date,
		$fechaDespachoSupervisor: Date,
		$fechaDespachoCompras: Date,
		$fechaRespuestaCompras: Date,
		$fechaEnvioCliente: Date,
		$fechaRespuestaCliente: Date,
		$tipoRespuestaCliente: String,
		$po: String,
		$fechaPo: Date,
		$comentarioAnalista: String,
		$fechaEntregaAlmacen: Date,
		$comentarioAlmacenista: String,
		$comentarioCoordinador: String,
		$valorConciliadoCliente: Float,
		$fechaConciliadoCliente: Date,
		$comentarioFacturador:String,
		$fechaEnvioActaSmu: Date,
		$comentarioActa: String,
		$fechaFirmaActaSmu: Date,
		$fechaGrSmu: Date
	) {
		updateOferta(
			input: {
				pk: $pk,
				solicitud: $solicitud,
				suministro: $suministro,
				servicio: $servicio ,
				cantidad: $cantidad,
				tipoOferta: $tipoOferta,
				tarea: $tarea,
				descripcionTarea: $descripcionTarea,
				encargadoCliente: $encargadoCliente,
				fechaEjecucion: $fechaEjecucion,
				confirmacionRecibido: $confirmacionRecibido,
				comentarioSupervisor: $comentarioSupervisor,
				subestadoOferta: $subestadoOferta,
				estadoOferta: $estadoOferta,
				usuario: $usuario,
				numeroOferta: $numeroOferta,
				modalidad: $modalidad,
				precioUnidadProveedor: $precioUnidadProveedor,
				precioTotalProveedor: $precioTotalProveedor,
				precioUnidadVenta: $precioUnidadVenta,
				precioTotalVenta: $precioTotalVenta,
				precioUnidadCliente: $precioUnidadCliente,
				precioTotalCliente: $precioTotalCliente,
				margen: $margen,
				tipoAdquisicion: $tipoAdquisicion,
				fechaRecibidoCliente: $fechaRecibidoCliente,
				fechaDespachoSupervisor: $fechaDespachoSupervisor,
				fechaDespachoCompras: $fechaDespachoCompras,
				fechaRespuestaCompras: $fechaRespuestaCompras,
				fechaEnvioCliente: $fechaEnvioCliente,
				fechaRespuestaCliente: $fechaRespuestaCliente,
				tipoRespuestaCliente: $tipoRespuestaCliente,
				po: $po,
				fechaPo: $fechaPo,
				comentarioAnalista: $comentarioAnalista,
				fechaEntregaAlmacen: $fechaEntregaAlmacen,
				comentarioAlmacenista: $comentarioAlmacenista,
				comentarioCoordinador: $comentarioCoordinador,
				valorConciliadoCliente: $valorConciliadoCliente,
				fechaConciliadoCliente: $fechaConciliadoCliente,
				comentarioFacturador:$comentarioFacturador,
				fechaEnvioActaSmu: $fechaEnvioActaSmu,
				comentarioActa: $comentarioActa,
				fechaFirmaActaSmu: $fechaFirmaActaSmu,
				fechaGrSmu: $fechaGrSmu,
				uid: $uid,
				credential: $credential
			}
		) {
			oferta {

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
	}
`;