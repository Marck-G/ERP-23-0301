const { Logger } = require("@kcram-solutions/logger");
const { generateResponse, generateErrorResponse } = require("../helpers/response");
const { Task } = require("../models/task");

const logger = new Logger();

async function listFilter(req, res) {
	const { filter, page, limit } = req.body
	const curLimit = limit ? limit : 30;
	const offset = (page ? page: 0) * curLimit;
	logger.log('Filtro:', filter);
	let response = generateResponse();
	response.status = 200;
	try {
		if (!filter) {
			logger.warn('Sin filtro')
			const data = await Task.findAll({
				limit: curLimit,
				offset,
			});
			response.data = data;
		} else {
			logger.log('Con filtro')
			const data = await Task.findAll({
				where: filter,
				limit: curLimit,
				offset
			})
			response.data = data;
		}
		res.status(200).json(response);
		return;
	} catch (e) {
		response = generateErrorResponse()
		response.errors = { error: e.message, ...e };
		res.status(400).json(response);
		logger.error('ListFilter', e.message, e)
		return;
	}
}


async function list(req, res) {
	const { page, limit } = req.body
	const curLimit = limit ? limit : 30;
	const offset = (page ? page: 0) * curLimit;
	let response = generateResponse();
	response.status = 200;
	try {
		const data = await Task.findAll({
			limit: curLimit,
			offset,
		});
		response.data = data;
		res.status(200).json(response);
		return;
	} catch (e) {
		response = generateErrorResponse()
		response.errors = { error: e.message, ...e };
		res.status(400).json(response);
		logger.error('List', e.message, e)
		return;
	}
}

async function del(req, res){
	const {uid} = req.params;
	try{
		const data = await Task.destroy({where:{uid}})
		const response = generateResponse();
		response.status = 202;
		response.data = {affected: data};
		res.status(202).json(response);
	}catch(e){
		const response = generateErrorResponse();
		response.errors= {error: e.message, ...e};
		res.status(400).json(response);
		logger.error('Delete', e.message, e);
		return;
	}
}

async function update(req, response){
	const data = req.body;
	const {uid} = req.params;
	try{
		const result = await Task.update(data, {where:{uid}})
		const response = generateResponse();
		response.status = 202;
		response.data = {affected: result};
		res.status(202).json(response);
		return;
	}catch(e){
		const response = generateErrorResponse();
		response.errors= {error: e.message, ...e};
		res.status(400).json(response);
		logger.error('Update', e.message, e);
		return;
	}
}

module.exports = {
	listFilter,
	list,
	del,
	update
}