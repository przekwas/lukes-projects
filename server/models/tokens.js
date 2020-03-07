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