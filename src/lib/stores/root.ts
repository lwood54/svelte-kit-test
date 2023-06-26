import { writable } from 'svelte/store';

export const rootStore = writable<{
	email?: string;
	username?: string;
}>({});
