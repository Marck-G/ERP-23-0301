
/**
 * Genera el objeto de respuesta básico
 * @returns {{status: number, message: string, data: object}} el json de una respuesta
 */
function generateResponse(){
	return {
		status: 400,
		succes: true,
		data: null
	}
}


/**
 * Genera un objeto de respuesta de error
 * @returns {{status: number, message: string, data: null, errors: object}} json de respuesta
 */
function generateErrorResponse(){
	const out = generateResponse();
	out.errors = {};
	out.succes = false;
	return out;
}


module.exports = {
	generateResponse,
	generateErrorResponse
}