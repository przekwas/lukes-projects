import knex from '../loaders/knex';
import { v4 as uuidv4 } from 'uuid';
import type { BlogsModel, UserModel } from 'types/models';

export async function getOne(id: string) {
	try {
		const [blog] = await knex<UserModel & BlogsModel>('blogs')
			.select('blogs.*', 'users.username')
			.join('users', 'blogs.userid', '=', 'users.id')
			.where('blogs.id', id);
		return blog;
	} catch (error) {
		throw error;
	}
}

export async function getAll() {
	try {
		const blogs = await knex<UserModel & BlogsModel>('blogs')
			.select('blogs.*', 'users.username')
			.join('users', 'blogs.userid', '=', 'users.id');
		return blogs;
	} catch (error) {
		throw error;
	}
}

export async function insert(blog: BlogsModel) {
	try {
		blog.id = uuidv4();
		await knex('blogs').insert(blog);
		return blog.id;
	} catch (error) {
		throw error;
	}
}

export async function edit(blog: BlogsModel) {
	try {
		const result = await knex('blogs').update(blog).where({ id: blog.id, userid: blog.userid });
		return result;
	} catch (error) {
		throw error;
	}
}

export async function destroy(id: string) {
	try {
		const result = await knex('blogs').delete().where({ id });
		return result;
	} catch (error) {
		throw error;
	}
}
