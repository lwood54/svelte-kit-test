import type { ServerLoadEvent } from '@sveltejs/kit';
import type { Actions } from './$types';
import CryptoJS from 'crypto-js';
import { PRIVATE_SECRET } from '$env/static/private';
import { ROOT_URL } from '$lib/constants/root';

export const load = async ({ cookies }: ServerLoadEvent): Promise<{ isLoggedIn: boolean }> => {
	const token = cookies.get('token');
	return { isLoggedIn: Boolean(token) };
};

export const actions: Actions = {
	login: async ({ fetch, request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;
		const url = `${ROOT_URL}/login`;
		if (username && password) {
			try {
				const response = await fetch(url, {
					method: 'POST',
					body: JSON.stringify({ username, password }),
					headers: { 'Content-type': 'application/json; charset=UTF-8' } // NOTE: won't work without charset
				});
				const user = await response.json();
				if (user.error || !user) {
					return { error: user.error ?? 'error fetching user' };
				}
				if (PRIVATE_SECRET) {
					const encrypted = CryptoJS.AES.encrypt(`${user.userId},${user.token}`, PRIVATE_SECRET);
					const stringForCookie = encrypted.toString();
					cookies.set('token', stringForCookie);
					return { user };
					// NOTE: for future reference, redirets inside a try/catch does not allow SvelteKit to handle
					// so it won't work correctly when used like this. https://kit.svelte.dev/docs/load#redirects
				}
			} catch (error) {
				console.error(error);
				return { error };
			}
		}
	},
	logout: async ({ cookies }) => {
		cookies.delete('email');
		cookies.delete('token');
	}
};
