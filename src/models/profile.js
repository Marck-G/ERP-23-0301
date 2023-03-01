const { Model, DataTypes, Sequelize } = require("sequelize")

class Profile extends Model{}

/**
 * Inicia el modelo en la base de datos
 * @param {Sequelize} sequelize la instancia de la base de datos
 */
function init(sequelize){
	Profile.init({
		firstName:{
			type: DataTypes.STRING,
			allowNull: false
		},
		familyName:{ type: DataTypes.STRING},
		familyName2:{ type: DataTypes.STRING},
		nif:{ type: DataTypes.STRING},
		puesto:{ type: DataTypes.STRING},
		encargado:{ type: DataTypes.STRING},
		
	}, {
		sequelize,
		tableName: 'ERP_001T00U01'
	})
}


module.exports = {Profile, init};