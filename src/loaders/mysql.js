const mysql = require('mysql');
const config = require('../config');

const state = {
	pool: null
};

exports.connect = async () => {
	state.pool = mysql.createPool(config.mysql);
};

exports.get = () => {
	return state.pool;
};