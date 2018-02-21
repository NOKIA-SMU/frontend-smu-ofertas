export interface Station {
	id?: string,
	nombre: string,
	ubicacion: string,
	region: string,
	departamento: string,
	ciudad: string,
	direccion: string,
	estructura: string,
	latitud: string,
	longitud: string,
	categoria: string,
	estado?: any,
	subestado?: any,
	creado?: string,
	actualizado?: any
}

export interface Subsystem {
	id?: number,
	nombre: string
}

export interface Request {
	id?: number,
	supervisorId: string,
	supervisor: string,
	analistaId: string,
	analista: string,
	tas: string
	estacion: {
		id: number,
		name: string
	},
	subsistema: number,
	suministros: any[],
	servicios: any[],
	prioridad: any,
	estadoSolicitud: boolean
}

export interface Supplie {
	id?: string,
	nombre: string,
	descripcion?: string
	codigoLpu: string,
	codigoMm: string,
	marca?: string,
	referencia?: string,
	subsistema: any,
	unidad?: string,
	valorLpu?: number,
	descripcionLpu?: string
	estado?: boolean,
	subestado?: boolean
}

export interface Service {
	id?: string,
	nombre: string,
	descripcion?: string
	codigoLpu: string,
	unidad: string,
	distancia: string,
	peso: string,
	tiempo: string,
	subsistema: any,
	valorLpu?: number,
	descripcionLpu?: string,
}