import type { ServerLoadEvent } from '@sveltejs/kit';
import { PRIVATE_SECRET } from '$env/static/private';
import type { User } from '$lib/types/api/user';
import { ROOT_URL } from '$lib/constants/root';
import CryptoJS from 'crypto-js';

export const load = async ({
	cookies
}: ServerLoadEvent): Promise<{ isLoggedIn: boolean; userInfo?: User }> => {
	const token = cookies.get('token');
	if (token) {
		const decryptedBytes = CryptoJS.AES.decrypt(token, PRIVATE_SECRET);
		const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8).split(',');
		const [userId, tokenString] = decryptedToken;
		const url = `${ROOT_URL}/user/${userId}`;
		try {
			const res = await fetch(url, {
				headers: {
					Authorization: `Bearer ${tokenString}`,
					'Content-Type': 'application/json'
				}
			});
			if (res.ok) {
				return { isLoggedIn: Boolean(token), userInfo: await res.json() };
			} else {
				cookies.delete('token');
				return { isLoggedIn: false };
			}
		} catch (error) {
			console.error('ERROR: layout.server.ts load', error);
			return { isLoggedIn: false };
		}
	}
	return { isLoggedIn: false };
};
