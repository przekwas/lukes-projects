const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const config = require('../config');

class UserService {
	constructor(logger, userModel, tokenModel = {}) {
		this.logger = logger;
		this.userModel = userModel;
		this.tokenModel = tokenModel;
	}

	async getUsers() {
		try {
			this.logger.silly('Getting all users');
			const users = await this.userModel.getAll();
			return users;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async getUser(id) {
		try {
			const user = await this.userModel.getOne('id', id);
			if (!user) {
				this.logger.silly(`User ${id} doesn't exist`);
				return { msg: "user doesn't exist" };
			} else {
				this.logger.silly(`Getting user ${id}`);
				delete user.password;
				return user;
			}
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async getUserEmail(email) {
		try {
			const user = await this.userModel.getOne('email', email);
			if (!user) {
				this.logger.silly(`User ${email} doesn't exist`);
				return { msg: "user doesn't exist" };
			} else {
				this.logger.silly(`Getting user ${email}`);
				return user;
			}
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async create(user) {
		try {
			this.logger.silly(`Salting and Hashing Password`);
			const salt = bcrypt.genSaltSync(12);
			const hash = bcrypt.hashSync(user.password, salt);
			user.password = hash;

			this.logger.silly(`Inserting user`);
			const id = await this.userModel.insert(user);

			this.logger.silly(`User ${id} created`);
			delete user.password;
			user.id = id;
			const token = this.generateToken(user);
			return { user, token };
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async login(user) {
		try {
			this.logger.silly('Logging user in');
			const token = await this.generateToken(user);
			return { token };
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async generateToken(user) {
		try {
			this.logger.silly('Inserting a token row');
			const id = await this.tokenModel.insert({ userid: user.id });

			this.logger.silly('Generating a jwt');
			const payload = {
				tokenid: id,
				userid: user.id,
				username: user.username,
				email: user.email,
				role: user.role
			};
			const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '30 days' });

			this.logger.silly('Updating token row after signing');
			const result = await this.tokenModel.update(token, id);
			if (result) {
				return token;
			} else {
				throw new Error('Failed to update token row');
			}
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}
}

module.exports = UserService;
