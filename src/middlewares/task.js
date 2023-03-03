const { Logger } = require("@kcram-solutions/logger");
const { generateResponse, generateErrorResponse } = require("../helpers/response");
const { Task } = require("../models/task");
const { v4: uuid } = require('uuid');

const logger = new Logger();

async function listFilter(req, res) {
	const { filter, page, limit } = req.body
	const curLimit = limit ? limit : 30;
	const offset = (page ? page: 0) * curLimit;
	logger.info('Listar Tareas  Limit',curLimit, ' Offset ', offset );
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
	logger.info('Listar Tareas  Limit',curLimit, ' Offset ', offset );
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
	logger.info('Eliminando Tarea', uid);
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

async function update(req, res){
	const data = req.body;
	const {uid} = req.params;
	logger.info('Actualizando Tarea', uid);
	try{
		const result = await Task.update(data, {where:{uid}})
		const response = generateResponse();
		response.status = 202;
		response.data = {affected: result[0]};
		response.data.new = await Task.findByPk(uid);
		res.status(202).json(response);
		return;
	}catch(e){
		const response = generateErrorResponse();
		response.errors= {error: e.message, ...e};
		res.status(400).json(response);
		logger.error('Update', e.message);
		return;
	}
}

async function create(req, res){
	const uid = uuid();
	const data = req.body;
	let response ;

	logger.info('Creando nueva Tarea', uid);
	try{
		const task = await Task.create({data});
		logger.info('Creando nueva Tarea', uid);
		response = generateResponse();
		response.data = task;
		response.status = 201;
		res.status(response.status).json(response);
		return
	}catch(e){
		response = generateErrorResponse();
		response.errors= {error: e.message, ...e};
		res.status(400).json(response);
		logger.error('Create', e.message);
		return;
	}
}

async function get(req, res){
	const {uid} = req.params;
	let response;
	try {
		if(!uid) throw new Error('Falta el uid de la tarea');
		const data = await Task.findByPk(uid);
		response = generateResponse();
		response.data = data;
		res.status(200).json(response);
		return;
	} catch (e) {
		response = generateErrorResponse();
		response.errors= {error: e.message, ...e};
		res.status(400).json(response);
		logger.error('GET', e.message);
		return;
	}
}

module.exports = {
	listFilter,
	list,
	del,
	update,
	create
}