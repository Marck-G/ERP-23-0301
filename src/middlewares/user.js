const { genPass } = require("../helpers/pass");
const { generateResponse, generateErrorResponse } = require("../helpers/response");
const { User } = require("../models/user");

async function create(req, res){
	const body = req.body;
	let response;
	try{
		if(!body.pass) throw new Error('No hay contraseña')
		body.pass = genPass(body.pass);
		let user = await User.create(body);
		response = generateResponse();
		response.status = 201,
		response.data = user;
		res.status(response.status).json(response);
		return;
	}catch(e){
		response = generateErrorResponse();
		response.errors = {error: e.message, ...e};
		res.status(400).json(response);
		return;
	}
}

module.exports = {
	create
};