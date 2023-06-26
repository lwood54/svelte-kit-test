import { redirect, type ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ cookies }: ServerLoadEvent) => {
	const publicToken = cookies.get('token');
	if (!publicToken) {
		throw redirect(307, '/login');
	}
};
