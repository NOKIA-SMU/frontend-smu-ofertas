
export interface Profile {
	id?: string;
	firstName: string;
	lastName: string;
	phoneNumber: number;
	email: string;
	userId: string;
}

export interface Role {
	id?: string;
	name: string;
	list?: any[];
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

