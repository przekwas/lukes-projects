const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const config = require('../config');

class UserService {
	constructor(userModel, tokenModel, logger) {
		this.userModel = userModel;
		this.tokenModel = tokenModel;
		this.logger = logger;
	}

	async getUsers() {
		try {
			this.logger.silly('Getting all users');
			const users = await this.userModel.getAll();
			return users;
		} catch (error) {
			this.logger.error(error);
			throw error.sqlMessage;
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
				return user;
			}
		} catch (error) {
			this.logger.error(error);
			throw error.sqlMessage;
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
			user.id = id;
			const token = this.generateToken(user);
			const refresh = await this.generateRefresh(user.id);
			delete user.password;
			return { user, token, refresh };
		} catch (error) {
			this.logger.error(error);
			throw error.sqlMessage;
		}
	}

	generateToken(user) {
		this.logger.silly('Generating a JWT');
		const payload = {
			userid: user.userid,
			username: user.username,
			email: user.email,
			role: user.role
		};
		const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
		return token;
	}

	async generateRefresh(userid) {
		try {
			this.logger.silly('Generating a Refresh Token');
			const refresh = randomBytes(48).toString('hex');

			this.logger.silly('Inserting Refresh Token');
			await this.tokenModel.insert({ userid, token: refresh });
			return refresh;
		} catch (error) {
			this.logger.error(error);
			throw error.sqlMessage;
		}
	}
}

module.exports = UserService;
