import mysql from 'mysql';
import { Query } from '@/db/query';

export class Table<T> {
	constructor(private tableName: string) {}

	all(orderBy?: string): Promise<T[]> {
		return Query(`SELECT * FROM ${this.tableName} ${orderBy ? 'ORDER BY ' + orderBy : ''}`);
	}

	one(id: number | string): Promise<T[]> {
		return Query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
	}

	insert(row: T) {
		return Query(`INSERT INTO ${this.tableName} SET ?`, row);
	}

	update(id: number, row: T) {
		return Query(`UPDATE ${this.tableName} SET ? WHERE id = ?`, [row, id]);
	}

	destroy(id: number) {
		return Query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
	}

	find(row: T, orderBy?: string): Promise<T[]> {
		return Query(
			`SELECT * FROM ${this.tableName} WHERE ${Object.keys(row)
				.map(col => `${mysql.escapeId(col)} = ?`)
				.join(' AND ')}${orderBy && ` ORDER BY ${orderBy} DESC`}`,
			Object.keys(row).map(col => row[col])
		);
	}

	findOne(row: T): Promise<T[]> {
		return Query(
			`SELECT * FROM ${this.tableName} WHERE ${Object.keys(row)
				.map(col => `${mysql.escapeId(col)} = ?`)
				.join(' AND ')} LIMIT 1`,
			Object.keys(row).map(col => row[col])
		);
	}

	search(col: string, val: string | number): Promise<T[]> {
		return Query(
			`SELECT * FROM ${this.tableName} WHERE ${mysql.escapeId(col as string)} LIKE ?`,
			[`%${val}%`]
		);
	}

	raw<K = any>(sql: string, values?: any): Promise<K> {
		return Query(sql, [values]);
	}
}
