const { Logger } = require('@kcram-solutions/logger');
const jwt = require('jsonwebtoken');
const logger = new Logger();

/**
 * Genera un token para el usuario
 * @param {User} user usuario
 * @returns {string} el token del usuario
 */
function genToken(user){
	const privateKey = process.env.SECRET;
	const expires = process.env.SECRET_EXPIRES;
	logger.log('Generando token');
	const token = jwt.sign({uid: user.uid, email: user.email, date: new Date().getTime()}, privateKey, {
		expiresIn: expires
	});
	return token;
}

/**
 * Verifica y decodifica un token
 * @param {string} token string con el token
 * @returns {Promise<object>} el contenido del token
 */
function verify(token){
	const privateKey = process.env.SECRET;
	return new Promise((resolve,reject)=>{
		jwt.verify(token, privateKey, (err, decode)=>{
			if(err){
				reject(err);
			}else{
				resolve(decode);
			}
		})
	})
}


module.exports = {
	genToken,
	verify
}