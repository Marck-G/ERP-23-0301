const { comparePass } = require("../helpers/pass");
const { generateErrorResponse, generateResponse } = require("../helpers/response");
const { genToken } = require("../helpers/token");
const { User } = require("../models/user");

async function login(request, response) {
	const { user, pass } = request.body;
	let res, token;
	const dbUser = await User.findOne({
		where: {
			email: user
		}
	});
	if (!dbUser) {
		res = generateErrorResponse()
		res.status = 401;
		res.errors.user = 'No se ha encontrado usuario en la base de datos';
		response.status(res.status).json(res);
		return;
	}

	if (!comparePass(pass, dbUser.pass)) {
		res = generateErrorResponse()
		res.status = 401;
		res.errors.pass = 'La contraseña no es la correcta';
		response.status(res.status).json(res);
		return;
	}

	res = generateResponse();
	res.status = 200;
	token = genToken(dbUser);
	dbUser.pass = null;
	res.data = { token, user: dbUser };
	response.status(res.status).json(res);
	return;
}

module.exports = {
	login
}