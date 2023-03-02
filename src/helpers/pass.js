const crypto = require('crypto');
function genPass(plainPass){
	const hash = crypto.createHash('sha512');
	hash.update(plainPass);
	return hash.digest().toString('base64');
}

function comparePass(plainPass, hashedPass){
	return genPass(plainPass) == hashedPass;
}

module.exports = {
	comparePass,
	genPass
}