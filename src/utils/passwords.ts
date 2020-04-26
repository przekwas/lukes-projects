import bcrypt from 'bcrypt';

export const generateSalted = (password: string) => {
	const salt = bcrypt.genSaltSync(12);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
}

export const comparePasswords = (password: string, salt: string) => {
	return bcrypt.compareSync(password, salt);
};
