const { Logger } = require("@kcram-solutions/logger");
const { comparePass } = require("../helpers/pass");
const { generateErrorResponse, generateResponse } = require("../helpers/response");
const { genToken } = require("../helpers/token");
const { sanitizeUser } = require("../helpers/users");
const { Profile } = require("../models/profile");
const { User } = require("../models/user");

const logger = new Logger();


async function login(request, response) {
	const { user, pass } = request.body;
	let res, token;
	let dbUser = await User.findOne({
		where: {
			email: user
		}
	});
	if (!dbUser) {
		res = generateErrorResponse()
		res.status = 401;
		res.errors.user = 'No se ha encontrado usuario en la base de datos';
		response.status(res.status).json(res);
		logger.warn('No se ha pasado el usuario')
		return;
	}

	if (!comparePass(pass, dbUser.pass)) {
		res = generateErrorResponse()
		res.status = 401;
		res.errors.pass = 'La contraseña no es la correcta';
		response.status(res.status).json(res);
		logger.warn('No se ha pasado la contraseña')
		return;
	}

	res = generateResponse();
	res.status = 200;
	token = genToken(dbUser);
	dbUser = sanitizeUser(dbUser);
	try{
		if(dbUser.profileUid){
			dbUser.profile = await Profile.findByPk(dbUser.profileUid);
			delete dbUser.profileUid;
		}
	}catch(err){
		logger.warn('No se ha podido cargar el perfil del usuario: ', err.message)
	};
	res.data = { token, user: dbUser };
	response.status(res.status).json(res);
	return;
}

module.exports = {
	login
}