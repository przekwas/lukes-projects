import bcrypt from 'bcrypt';

export const comparePasswords = (password: string, salt: string) => {
	return bcrypt.compareSync(password, salt);
};
