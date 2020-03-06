const mysql = require('mysql');
const config = require('../config');

module.exports = async () => {
    const connection = mysql.createPool(config.mysql);
    return connection;
}