const { Logger } = require('@kcram-solutions/logger');
const { genPass } = require('./helpers/pass');
const { Profile } = require('./models/profile');
const { Project } = require('./models/project');
const { Task } = require('./models/task');
const { User } = require('./models/user');

const uuid = require('uuid').v4;

async function generateData() {
	const userUid = uuid()
	const profileUid = uuid()
	const projectUid = uuid()
	const task1Uid = uuid()
	const task2Uid = uuid()
	const logger = new Logger();

	const profile = await Profile.create({
		uid: profileUid,
		firstName: 'Marck',
		familyName: 'Carrión',
		familyName2: 'Guzmán',
		nif: '73127907M',
		puesto: 'CEO'
	});
	logger.log('Creada perfil:', profile)
	
	const user = await User.create({
		uid: userUid,
		userName: 'mcarrion',
		pass: genPass('1111111'),
		email: 'mcarrion@kcramsolutions.com',
		phone: '662447645',
		profileUid: profileUid
	})
	logger.log('Creado usuario:', user)

	const project = await Project.create({
		uid: projectUid,
		name: 'ERP interno',
		description: 'ERP simple interno',
		code: 'ERP-23-0301',
		managerUid: userUid
	});

	logger.log('Creado projecto:', project)


	const task1 = await Task.create({
		uid: task1Uid,
		name: 'Crear crud',
		code: 'ERP-23/0301',
		description: 'Tarea de ejemplo 1',
		managerUid: userUid,
		crafterUid: userUid,
		ProjectUid: projectUid
	});
	logger.log('Creada Task1:', task1)

	const task2 = await Task.create({
		uid: task2Uid,
		name: 'Crear crud',
		code: 'ERP-23/0301',
		description: 'Tarea de ejemplo 1',
		managerUid: userUid,
		crafterUid: userUid,
		ProjectUid: projectUid,
		fatherUid: task1Uid
	});
	logger.log('Creada Task 2:', task2)
}


module.exports = {
	generateData
}