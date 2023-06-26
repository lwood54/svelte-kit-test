import { PRIVATE_SECRET } from '$env/static/private';
import { UrlPaths } from '$lib/constants/root';
import { getUser } from '$lib/helpers/utils';
import type { Bill } from '$lib/types/api/bills';
import { error, redirect, type Actions, type ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({
	cookies,
	params
}: ServerLoadEvent): Promise<{ bill?: Bill } | { error?: string }> => {
	const publicToken = cookies.get('token');
	const billId = params.id;
	if (publicToken && billId) {
		const { token } = getUser(publicToken, PRIVATE_SECRET);
		try {
			const res = await fetch(UrlPaths.bills.get.item(billId), {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});
			if (res.ok) {
				return { bill: await res.json() };
			} else {
				return await res.json();
			}
		} catch (err) {
			throw error(500, 'error fetching bill details');
		}
	} else {
		throw redirect(307, '/login');
	}
};

export const actions: Actions = {
	update: async ({ fetch, request, cookies, url }) => {
		const publicToken = cookies.get('token');
		const data = await request.formData();
		const amount = Number(data.get('amount'));
		const balance = Number(data.get('balance'));
		const dayDue = Number(data.get('daydue'));
		const limit = Number(data.get('limit'));
		const rate = Number(data.get('rate'));
		const title = data.get('title');
		const billId = url.pathname.split('/edit/')[1];
		if (!publicToken) {
			return {
				error: 'not logged in'
			};
		}
		const { token } = getUser(publicToken, PRIVATE_SECRET);
		if (!token) {
			return {
				error: 'not authorized'
			};
		}
		if (!billId) {
			return {
				error: 'bill not identified'
			};
		}
		try {
			const res = await fetch(UrlPaths.bills.update(billId), {
				method: 'PUT',
				body: JSON.stringify({ amount, balance, dayDue, limit, rate, title }),
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json; charset=UTF-8'
				}
			});
			if (res.ok) {
				return { isSuccess: true };
			} else {
				return await res.json();
			}
		} catch (err) {
			console.error(err);
			return { error: err };
		}
	}
};
