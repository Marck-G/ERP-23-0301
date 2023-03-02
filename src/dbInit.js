const { database } = require("./db/connector");
const status = require("./models/status");
const user = require("./models/user");
const profile = require("./models/profile");
const staff = require("./models/staff");
const account = require("./models/account");
const budgetRow = require("./models/budget_row");
const budget = require("./models/budget");
const company = require("./models/company");
const discounts = require("./models/discounts");
const document = require("./models/document");
const invoice_status = require("./models/invoice_status");
const invoice = require("./models/invoice");
const project = require("./models/project");
const templates = require("./models/templates");
const task = require("./models/task");
const { Logger } = require("@kcram-solutions/logger");



const logger = new Logger();


async function startDB(){
	try {
		logger.log('Iniciando modelos')
		await status.init(database)
		await user.init(database)
		await document.init(database)
		await profile.init(database)
		await invoice_status.init(database)
		await project.init(database);
		await staff.init(database)
		await account.init(database)
		await company.init(database)
		await budgetRow.init(database)
		await discounts.init(database)
		await templates.init(database)
		await task.init(database)
		await budget.init(database)
		await invoice.init(database)
	} catch (err) {
		logger.error('| DB SYNC |', err.message, err);
	}
}

async function createDB(force = false){
	try{
		await startDB();
		logger.log('Sincronizando modelos con la base de datos')
		await database.sync({ force })
	}catch(err){
		logger.error('| DB CREATE |', err.message);

	}
}

module.exports = {
	startDB,		
	/**
	 * Sincroniza la base de datos
	 * @param {boolean} force fuerza la sinconización
	 */
	createDB
}