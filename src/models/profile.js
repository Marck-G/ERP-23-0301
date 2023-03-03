const { Model, DataTypes, Sequelize } = require("sequelize");
const { User } = require("./user");

class Profile extends Model{}

/**
 * Inicia el modelo en la base de datos
 * @param {Sequelize} sequelize la instancia de la base de datos
 */
function init(sequelize){
	Profile.init({
		uid: {type: DataTypes.STRING, primaryKey: true},
		firstName:{
			type: DataTypes.STRING,
			allowNull: false
		},
		familyName:{ type: DataTypes.STRING},
		familyName2:{ type: DataTypes.STRING},
		nif:{ type: DataTypes.STRING},
		puesto:{ type: DataTypes.STRING},
		
	}, {
		sequelize,
		tableName: 'ERP_001T00U01'
	})
	Profile.hasOne(User, {as: 'profile'});
}


module.exports = {Profile, init};