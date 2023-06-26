import CryptoJS from 'crypto-js';

export const getUser = (tkn: string, secret: string): { userId: string; token: string } => {
	const decryptedBytes = CryptoJS.AES.decrypt(tkn, secret);
	const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8).split(',');
	const [userId, token] = decryptedToken;
	return { userId, token };
};
