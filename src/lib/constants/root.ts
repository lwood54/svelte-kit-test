const PRODUCTION_URL = 'https://bills-io.up.railway.app';
const DEV_URL = 'http://localhost:8080';
// export const ROOT_URL = process.env.NODE_ENV === 'production' ? PRODUCTION_URL : DEV_URL;
export const ROOT_URL = PRODUCTION_URL;

export const UrlPaths = {
	bills: {
		create: (userId: string) => `${ROOT_URL}/bills/${userId}/create`,
		get: {
			item: (id: string) => `${ROOT_URL}/bills/${id}`,
			list: (userId: string) => `${ROOT_URL}/bills/${userId}/list`
		},
		update: (id: string) => `${ROOT_URL}/bills/${id}`,
		delete: (id: string) => `${ROOT_URL}/bills/${id}`
	},
	categories: {
		create: (userId: string) => `${ROOT_URL}/categories/${userId}create`,
		get: {
			item: (id: string) => `${ROOT_URL}/categories/${id}`,
			list: (userId: string) => `${ROOT_URL}/categories/${userId}/list`
		},
		update: (id: string) => `${ROOT_URL}/categories/${id}`,
		delete: (id: string) => `${ROOT_URL}/categories/${id}`
	},
	logs: {
		create: (userId: string) => `${ROOT_URL}/logs/${userId}/create`,
		get: {
			item: (id: string) => `${ROOT_URL}/logs/${id}`,
			list: (userId: string) => `${ROOT_URL}/logs/${userId}/list`
		},
		update: (id: string) => `${ROOT_URL}/logs/${id}`,
		delete: (id: string) => `${ROOT_URL}/logs/${id}`
	}
};
