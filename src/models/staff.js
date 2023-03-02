const { Model, DataTypes } = require("sequelize");
const { User } = require("./user");

class Staff extends Model{}

function init(sequelize){
	Staff.init({
		uid: {type: DataTypes.STRING, primaryKey: true},
		name: {type: DataTypes.STRING},
		familyName: {type: DataTypes.STRING},
		familyName2: {type: DataTypes.STRING},
		email: {type: DataTypes.STRING},
		phone: {type: DataTypes.STRING},
		dir: {type: DataTypes.STRING},
		position: {type: DataTypes.STRING},
		img: {type: DataTypes.BLOB}
	}, {
		sequelize,
		tableName: 'ERP_001T00U04'
	})
}

module.exports = {Staff, init}