import bcrypt from 'bcrypt';

export function generateHash(password: string) {
	return new Promise<string>((resolve, reject) => {
		bcrypt.genSalt(12, (err, salt) => {
			if (err) reject(err);

			bcrypt.hash(password, salt, (err, salted) => {
				if (err) reject(err);

				resolve(salted);
			});
		});
	});
}

export function comparePasswords(password: string, hash: string) {
	return new Promise<boolean>((resolve, reject) => {
		bcrypt.compare(password, hash, (err, same) => {
			if (err) reject(err);

			resolve(same);
		})
	})
}
