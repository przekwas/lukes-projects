const db = require('../loaders/mysql');

exports.get = userid => {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM dungeon_notes WHERE userid = ?`;
		const values = [userid];
		db.get().query(sql, values, (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
};
