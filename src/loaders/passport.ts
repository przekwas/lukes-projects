import passport from 'passport';
import LocalStrategy from 'passport-local';
import knex from './knex';
import config from '../config';
import { comparePasswords } from '../utils';
import type { UserModel } from 'types/models';

export default async function ({ app }) {
	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((user, done) => done(null, user));

	passport.use(
		new LocalStrategy.Strategy({ usernameField: 'email' }, async (email, password, done) => {
			try {
				const [user] = await knex<UserModel>('users').select().where({ email });
				const same = await comparePasswords(password, user.hashed);
				if (user && user.banned !== 1 && same) {
					delete user.hashed;
					done(null, user);
				} else {
					done(null, false);
				}
			} catch (error) {
				done(error);
			}
		})
	);

	app.use(passport.initialize());
}
