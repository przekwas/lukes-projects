import config from '../config';
import passport from 'passport';
import express from 'express';
import knex from './knex';
import LocalStrategy from 'passport-local';
import JwtStrategy from 'passport-jwt';

import { comparePasswords } from '../utils/passwords';

import type { Payload } from '../types/jwt';
import type { UserModel } from '../types/models';

export default async function ({ app }: { app: express.Application }) {
	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((user, done) => done(null, user));

	passport.use(
		new LocalStrategy.Strategy({ usernameField: 'email' }, async (email, password, done) => {
			try {
				const [user] = await knex<UserModel>('users').select().where({ email });
				const compared = await comparePasswords(password, user.hashed);
				if (user && compared) {
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

	passport.use(
		new JwtStrategy.Strategy(
			{
				jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: config.jwt.secret,
				issuer: config.jwt.issuer
			},
			async (payload: Payload, done) => {
				try {
					done(null, payload);
				} catch (error) {
					done(error);
				}
			}
		)
	);

	app.use(passport.initialize());
}
