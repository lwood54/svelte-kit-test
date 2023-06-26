export type Bill = {
	id: string;
	balance: number;
	dayDue: number;
	rate: number;
	limit: number;
	amount: number;
	title: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
};

export type Category = {
	id: string;
	title: string;
};

export type Log = {
	id: string;
	amount: number;
	scale: Scale;
	title: string;
	categoryId: string;
	createdAt: Date;
	updatedAt: Date;
};

export type Scale = 'ESSENTIAL' | 'NEUTRAL' | 'NON_ESSENTIAL';
