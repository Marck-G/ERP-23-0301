require('dotenv').config();
const { expressjwt } = require("express-jwt");
const express = require('express');
const morgan = require('morgan');
const dbInit = require("./dbInit");
const { Logger, LEVEL } = require("@kcram-solutions/logger");
const { User } = require("./models/user");
const { v4: uuid } = require('uuid');
const { genPass } = require("./helpers/pass");
const { login } = require("./middlewares/login");
const app = express();

const authorization = expressjwt({
	secret: process.env.SECRET || 'e5efce5728499a590eabd0bdc66ff51f389a5c5a0ab57fe4ce21bd18f916c3d2d8b7960014440496ef40f70c321347492f8cc4efcd35dad2b337ba766399831f',
	algorithms: ['RS256', 'HS256']
})
Logger.length = LEVEL.DEBUG;
const logger = new Logger()

app.use(morgan('tiny'));
app.use(express.urlencoded())
app.use(express.json());

app.use('/api', authorization, require('./routes'))
app.post('/auth/login', login);

logger.log('Iniciando app');
// dbInit.createDB(true).then(()=>{
	dbInit.startDB().then(()=>{
		
	// 	logger.log('Creamos usuario');
	// User.create({
	// 	userName: 'marck',
	// 	email: 'mcarrion@kcramsolutions.com',
	// 	uid: uuid(),
	// 	phone: '662447645',
	// 	pass: genPass('Estafeta,13')
	// });
	app.listen(process.env.PORT || 2000, () => {
		logger.log('Servidor activo en el puerto ', process.env.PORT || 2000)
	})
})



