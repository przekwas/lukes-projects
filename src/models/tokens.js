const db = require('../loaders/mysql');

exports.insert = info => {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO tokens SET ?`;
		const values = info;
		db.get().query(sql, values, (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results.insertId);
			}
		});
	});
};

exports.update = (token, id) => {
	return new Promise((resolve, reject) => {
		const sql = `UPDATE tokens SET token = ? WHERE id = ?`;
		const values = [token, id];
		db.get().query(sql, values, (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results.affectedRows);
			}
		});
	});
};

exports.match = (id, userid, token) => {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM tokens WHERE id = ? AND userid = ? AND token = ?`;
		const values = [id, userid, token];
		db.get().query(sql, values, (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results[0]);
			}
		});
	});
}