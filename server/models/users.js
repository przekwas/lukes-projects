const db = require('../loaders/mysql');

exports.getAll = () => {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT 
			id,
            first_name,
            last_name,
            username,
            email,
            role
        FROM users
        `;
		db.get().query(sql, (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
};

exports.getOne = (column, value) => {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			id,
            first_name,
            last_name,
            username,
            email,
            role
        FROM users
        WHERE ?? = ?
        `;
		const values = [column, value];
		db.get().query(sql, values, (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results[0]);
			}
		});
	});
};

exports.insert = user => {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO users SET ?`;
		const values = user;
		db.get().query(sql, values, (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results.insertId);
			}
		});
	});
};
