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