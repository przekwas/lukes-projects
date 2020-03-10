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

exports.getOne = (id, userid) => {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM dungeon_notes WHERE id = ? AND userid = ?`;
		const values = [id, userid];
		db.get().query(sql, values, (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results[0]);
			}
		});
	});
};

exports.insert = note => {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO dungeon_notes SET ?`;
		const values = note;
		db.get().query(sql, values, (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results.insertId);
			}
		});
	});
};

exports.edit = note => {
	return new Promise((resolve, reject) => {
		const sql = `UPDATE dungeon_notes SET title = ?, body = ? WHERE id = ? AND userid = ?`;
		const values = [note.title, note.body, note.id, note.userid];
		db.get().query(sql, values, (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results.affectedRows);
			}
		});
	});
};

exports.delete = (id, userid) => {
	return new Promise((resolve, reject) => {
		const sql = `DELETE FROM dungeon_notes WHERE id = ? AND userid = ?`;
		const values = [id, userid];
		db.get().query(sql, values, (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results.affectedRows);
			}
		});
	});
};