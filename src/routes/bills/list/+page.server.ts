import { PRIVATE_SECRET } from '$env/static/private';
import { UrlPaths } from '$lib/constants/root';
import { getUser } from '$lib/helpers/utils';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { Bill } from '$lib/types/api/bills';

export const load = async ({
	cookies
}: ServerLoadEvent): Promise<{ bills?: Bill[] } | { error?: string }> => {
	const publicToken = cookies.get('token');
	if (publicToken) {
		const { userId, token } = getUser(publicToken, PRIVATE_SECRET);
		try {
			const res = await fetch(UrlPaths.bills.get.list(userId), {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});
			if (res.ok) {
				return { bills: await res.json() };
			} else {
				return await res.json();
			}
		} catch (err) {
			throw error(500, 'error fetching bills');
		}
	} else {
		throw redirect(307, '/login');
	}
};
