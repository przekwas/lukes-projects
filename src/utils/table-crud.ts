import mysql from 'mysql';
import { Query } from '../db/query';

export class Table<T> {
	constructor(private tableName: string) {}

	all(orderBy?: string): Promise<T> {
		return Query(`SELECT * FROM ${this.tableName} ${orderBy ? 'ORDER BY ' + orderBy : ''}`);
	}

	one(id: number): Promise<T> {
		return Query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
	}

	insert(row: T): Promise<T> {
		return Query(`INSERT INTO ${this.tableName} SET ?`, row);
	}

	update(id: number, row: T): Promise<T> {
		return Query(`UPDATE ${this.tableName} SET ? WHERE id = ?`, [row, id]);
	}

	find(row: T): Promise<T> {
		return Query(
			`SELECT * FROM users WHERE ${Object.keys(row)
				.map(col => `${mysql.escapeId(col)} = ?`)
				.join(' AND ')}`,
			Object.keys(row).map(col => row[col])
		);
	}

	findOne(row: T): Promise<T> {
		return Query(
			`SELECT * FROM users WHERE ${Object.keys(row)
				.map(col => `${mysql.escapeId(col)} = ?`)
				.join(' AND ')} LIMIT 1`,
			Object.keys(row).map(col => row[col])
		);
	}

	raw(sql: string, values?: any): Promise<T> {
		return Query(sql, [values]);
	}
}
