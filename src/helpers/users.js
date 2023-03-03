const { Logger } = require("@kcram-solutions/logger");

const logger = new Logger();

function sanitizeUser(user){
	try{
		const objt = JSON.parse(JSON.stringify(user));
		delete objt.pass;
		return objt;
	}catch(e){
		logger.error('| Sanitize User |', e.message)
		user.pass = null;
		return user;
	}
}

module.exports = {sanitizeUser}