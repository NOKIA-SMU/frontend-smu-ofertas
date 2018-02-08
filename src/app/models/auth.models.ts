
export interface Profile {
	uid?: string
	id?: string;
	fullName?: string;
	firstName: string;
	lastName: string;
	phoneNumber: number;
	email: string;
	userId?: string;
	region?: string;
	roles?: any;
	rolesParsed?: any;
}

export interface Role {
	id?: string;
	name: string;
	list?: any[];
	checked?: boolean;
}

export interface Permission {
	id?: string;
	name: string;
	model: string;
	checked?: boolean;
}

export interface RolePermissions {
	id: string;
	list: Permission[];
	// checked?: boolean;
}


export interface RoleColsOffer {
	id: string;
	list: any[];
	// checked?: boolean;
}

