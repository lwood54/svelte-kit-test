import { getUser } from '$lib/helpers/utils';
import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { PRIVATE_SECRET } from '$env/static/private';
import { ROOT_URL } from '$lib/constants/root';
import type { Category } from '$lib/types/api/bills';

export const load = async ({
	cookies,
	params
}: ServerLoadEvent): Promise<{ category?: Category }> => {
	const { id } = params;
	const publicToken = cookies.get('token');
	if (publicToken && id) {
		const { token } = getUser(publicToken, PRIVATE_SECRET);
		const url = `${ROOT_URL}/categories/${id}`;
		try {
			const res = await fetch(url, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});
			// NOTE: learned can only await once. So awaiting and logging
			// and then awaiting and returning results in category.bodyUsed = true
			// so throwing an error 'Body unusable...'
			if (res.ok) {
				return { category: await res.json() };
			} else {
				return await res.json();
			}
		} catch (err) {
			console.error('ERROR error fetching category details', err);
			throw error(500, 'error fetching category details');
		}
	}
	return {};
};
