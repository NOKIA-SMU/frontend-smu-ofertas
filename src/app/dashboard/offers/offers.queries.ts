import gql from 'graphql-tag';

export const queryAccessType = gql`query($uid:String, $credential:String) { tipoAcceso(uid: $uid, credential: $credential) }`;
export const querySitesType = gql`query($uid:String, $credential:String) { tipoSitio(uid: $uid, credential: $credential) }`;
export const queryNatureServices = gql`query($uid:String, $credential:String) { naturalezaServicio(uid: $uid, credential: $credential) }`;
export const queryOfferType = gql`query($uid:String, $credential:String) { tipoOferta(uid: $uid, credential: $credential) }`;
export const queryElementType = gql`query($uid:String, $credential:String) { tipoElemento(uid: $uid, credential: $credential) }`;
export const queryModalities = gql`query($uid:String, $credential:String) { modalidad(uid: $uid, credential: $credential) }`;
export const queryAcquisitionTypes = gql`query($uid:String, $credential:String) { tipoAdquisicion (uid: $uid, credential: $credential) }`;
export const queryProviders = gql`query($uid:String, $credential:String) { proveedor(uid: $uid, credential: $credential) }`;
export const queryTypesClientResponse = gql`query($uid:String, $credential:String) { tipoRespuestaCliente (uid: $uid, credential: $credential) }`;
export const queryConfirmationsReceived = gql`query($uid:String, $credential:String) { confirmacionRecibido(uid: $uid, credential: $credential) }`;
export const querySubstatesOffer = gql`query($uid:String, $credential:String) { subestadoOferta (uid: $uid, credential: $credential) }`;
export const queryStatesOffer = gql`query($uid:String, $credential:String) { estadoOferta (uid: $uid, credential: $credential) }`;

export const queryOffers = gql`
	query ($uid: String, $credential: String) {
		ofertas(uid: $uid, credential: $credential) {
			id
			ordenSuministro {
				id
				solicitud {
					id
					supervisor
					supervisorId
					analista
					analistaId
					estacion {
						id
						nombre
						region
						departamento
						ciudad
					}
				}
				suministro {
					id
					nombre
					unidad
					marca
					referencia
					codigoLpu
					descripcion
					valorLpu
					descripcionLpu
				}
				cantidad
				comentario
			}
			ordenServicio {
				id
				solicitud {
					id
					supervisor
					supervisorId
					analista
					analistaId
					estacion {
						id
						nombre
						region
						departamento
						ciudad
					}
				}
				servicio {
					id
					nombre
					unidad
					codigoLpu
					descripcion
					valorLpu
					descripcionLpu
				}
				cantidad
				comentario
			}
			tipoAcceso
			tipoSitio
			naturalezaServicio
			descripcionOds
			fechaRecibidoOds
			semanaRecibidoOds
			tipoOferta
			workOrder
			descripcionTarea
			encargadoCliente
			fechaEjecucion
			confirmacionRecibido
			comentarioSupervisor
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
			proveedor
			tasOfertaAnterior
			fechaDespachoSupervisor
			semanaDespachoSupervisor
			fechaDespachoCompras
			semanaDespachoCompras
			fechaRespuestaCompras
			semanaRespuestaCompras
			fechaEnvioOfertaCliente
			semanaEnvioOfertaCliente
			fechaEnvioOfertaClienteNegociada
			semanaEnvioOfertaClienteNegociada
			fechaRespuestaCliente
			semanaRespuestaCliente
			fechaRespuestaClienteNegociada
			semanaRespuestaClienteNegociada
			tipoRespuestaCliente
			tipoRespuestaClienteNegociada
			po
			fechaPo
			valorPo
			comentarioAnalista
			subestadoOferta
			estadoOferta
			fechaEntregaAlmacen
			comentarioAlmacenista
			comentarioCoordinador
			tipoElemento
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
	query ($pk: ID, $uid: String, $credential: String) {
		oferta(pk: $pk, uid: $uid, credential: $credential) {
			id
			ordenSuministro {
				id
				solicitud {
					id
					supervisor
					analista
					estacion {
						id
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
				cantidad
				comentario
			}
			ordenServicio {
				id
				solicitud {
					id
					supervisor
					analista
					estacion {
						id
						region
						departamento
					}
				}
				servicio {
					id
					nombre
				}
				cantidad
				comentario
			}
			tipoAcceso
			tipoSitio
			naturalezaServicio
			descripcionOds
			fechaRecibidoOds
			semanaRecibidoOds
			tipoOferta
			workOrder
			descripcionTarea
			encargadoCliente
			fechaEjecucion
			confirmacionRecibido
			comentarioSupervisor
			numeroOferta
			modalidad
			precioUnidadProveedor
			precioUnidadVenta
			precioUnidadCliente
			tipoAdquisicion
			proveedor
			tasOfertaAnterior
			fechaDespachoSupervisor
			fechaDespachoCompras
			fechaRespuestaCompras
			fechaEnvioOfertaCliente
			fechaEnvioOfertaClienteNegociada
			fechaRespuestaCliente
			fechaRespuestaClienteNegociada
			tipoRespuestaCliente
			tipoRespuestaClienteNegociada
			po
			fechaPo
			valorPo
			comentarioAnalista
			subestadoOferta
			estadoOferta
			fechaEntregaAlmacen
			comentarioAlmacenista
			comentarioCoordinador
			tipoElemento
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
		$ordenSuministro: ID,
		$ordenServicio: ID,
		$tipoAcceso: String,
		$tipoSitio: String,
		$naturalezaServicio: String,
		$descripcionOds: String,
		$fechaRecibidoOds: Date,
		$tipoOferta: String,
		$workOrder: String,
		$descripcionTarea: String,
		$encargadoCliente: String,
		$tipoElemento: String,
		$fechaEjecucion: Date,
		$confirmacionRecibido: String,
		$comentarioSupervisor: String,
		$numeroOferta:String,
		$modalidad:String,
		$precioUnidadProveedor: Float,
		$precioUnidadVenta: Float,
		$precioUnidadCliente: Float,
		$tipoAdquisicion: String,
		$proveedor: String,
		$tasOfertaAnterior: String,
		$fechaDespachoCompras: Date,
		$fechaRespuestaCompras: Date,
		$fechaEnvioOfertaCliente: Date,
		$fechaEnvioOfertaClienteNegociada: Date,
		$fechaRespuestaCliente: Date,
		$fechaRespuestaClienteNegociada: Date,
		$tipoRespuestaCliente: String,
		$tipoRespuestaClienteNegociada: String,
		$po: String,
		$fechaPo: Date,
		$valorPo: Float,
		$comentarioAnalista: String,
		$subestadoOferta:String,
		$estadoOferta:String,
		$fechaEntregaAlmacen: Date,
		$comentarioAlmacenista: String,
		$comentarioCoordinador: String,
		$valorConciliadoCliente: Float,
		$fechaConciliadoCliente: Date,
		$comentarioFacturador:String,
		$fechaEnvioActaSmu: Date,
		$comentarioActa: String,
		$fechaFirmaActaSmu: Date,
		$fechaGrSmu: Date,
		$uid: String!,
		$credential: String!,
	) {
		updateOferta(
			pk: $pk,
			ordenSuministro: $ordenSuministro,
			ordenServicio: $ordenServicio,
			tipoAcceso: $tipoAcceso,
			tipoSitio: $tipoSitio,
			naturalezaServicio: $naturalezaServicio,
			descripcionOds: $descripcionOds,
			fechaRecibidoOds: $fechaRecibidoOds,
			tipoOferta: $tipoOferta,
			workOrder: $workOrder,
			descripcionTarea: $descripcionTarea,
			encargadoCliente: $encargadoCliente,
			tipoElemento: $tipoElemento,
			fechaEjecucion: $fechaEjecucion,
			confirmacionRecibido: $confirmacionRecibido,
			comentarioSupervisor: $comentarioSupervisor,
			numeroOferta: $numeroOferta,
			modalidad: $modalidad,
			precioUnidadProveedor: $precioUnidadProveedor,
			precioUnidadVenta: $precioUnidadVenta,
			precioUnidadCliente: $precioUnidadCliente,
			tipoAdquisicion: $tipoAdquisicion,
			proveedor: $proveedor,
			tasOfertaAnterior: $tasOfertaAnterior,
			fechaDespachoCompras: $fechaDespachoCompras,
			fechaRespuestaCompras: $fechaRespuestaCompras,
			fechaEnvioOfertaCliente: $fechaEnvioOfertaCliente,
			fechaEnvioOfertaClienteNegociada: $fechaEnvioOfertaClienteNegociada,
			fechaRespuestaCliente: $fechaRespuestaCliente,
			fechaRespuestaClienteNegociada: $fechaRespuestaClienteNegociada,
			tipoRespuestaCliente: $tipoRespuestaCliente,
			tipoRespuestaClienteNegociada: $tipoRespuestaClienteNegociada,
			po: $po,
			fechaPo: $fechaPo,
			valorPo: $valorPo,
			comentarioAnalista: $comentarioAnalista,
			subestadoOferta: $subestadoOferta,
			estadoOferta: $estadoOferta,
			fechaEntregaAlmacen: $fechaEntregaAlmacen,
			comentarioAlmacenista: $comentarioAlmacenista,
			comentarioCoordinador: $comentarioCoordinador,
			valorConciliadoCliente: $valorConciliadoCliente,
			fechaConciliadoCliente: $fechaConciliadoCliente,
			comentarioFacturador: $comentarioFacturador,
			fechaEnvioActaSmu: $fechaEnvioActaSmu,
			comentarioActa: $comentarioActa,
			fechaFirmaActaSmu: $fechaFirmaActaSmu,
			fechaGrSmu: $fechaGrSmu,
			uid: $uid,
			credential: $credential
		) {
			oferta {
				id
				ordenSuministro {
					id
					solicitud {
						id
						supervisor
						analista
						estacion {
							id
							region
							departamento
						}
					}
					suministro {
						id
						nombre
					}
					cantidad
					comentario
				}
				ordenServicio {
					id
					solicitud {
						id
						supervisor
						analista
						estacion {
							id
							region
							departamento
						}
					}
					cantidad
					comentario
				}
				tipoAcceso
				tipoSitio
				naturalezaServicio
				descripcionOds
				fechaRecibidoOds
				tipoOferta
				workOrder
				descripcionTarea
				encargadoCliente
				fechaEjecucion
				confirmacionRecibido
				comentarioSupervisor
				numeroOferta
				modalidad
				precioUnidadProveedor
				precioUnidadVenta
				precioUnidadCliente
				tipoAdquisicion
				proveedor
				tasOfertaAnterior
				fechaDespachoSupervisor
				fechaDespachoCompras
				fechaRespuestaCompras
				fechaEnvioOfertaCliente
				fechaEnvioOfertaClienteNegociada
				fechaRespuestaCliente
				fechaRespuestaClienteNegociada
				tipoRespuestaCliente
				tipoRespuestaClienteNegociada
				po
				fechaPo
				comentarioAnalista
				subestadoOferta
				estadoOferta
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

export const deleteOffer = gql`
	mutation (
		$pk: ID!,
		$uid: String!,
		$credential: String!,
	) {
		deleteOferta(
			pk: $pk,
			uid: $uid,
			credential: $credential
		) {
			status
			__typename
		}
	}
`;