const { Logger } = require("@kcram-solutions/logger");
const { Sequelize } = require("sequelize");
const logger = new Logger()
const db = new Sequelize(
	'erp',
 'root',
 'pass',
  {
    host: 'localhost',
		port: 4500,
    dialect: 'mariadb',
		logging: (msg)=>{logger.debug(msg)}
  })


	module.exports = {
		database: db
	}