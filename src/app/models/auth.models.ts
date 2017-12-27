
export interface Profile {
	uid?: string
	id?: string;
	firstName: string;
	lastName: string;
	phoneNumber: number;
	email: string;
	userId: string;
	region?: string;
	roles?: {};
}

export interface Role {
	id?: string;
	name: string;
	list?: any[];
	checked?: boolean;
}

export interface Permission {
	id: string;
	name: string;
	model: string;
	checked?: boolean;
}

export interface RolePermissions {
	id: string;
	list: Permission[];
	// checked?: boolean;
}

