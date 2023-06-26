import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ cookies, url }: ServerLoadEvent): Promise<{ message: string }> => {
	const message = url.searchParams.get('msg') ?? 'There was an error.';
	if (message.includes('Expired Token')) {
		cookies.delete('token');
	}
	return { message };
};
