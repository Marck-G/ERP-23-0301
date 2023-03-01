const { Model, DataTypes } = require("sequelize");

class User extends Model{}

function init(sequelize){
	User.init({
		userName: {type: DataTypes.STRING},
		pass: {type: DataTypes.STRING},
		email: {type: DataTypes.STRING},
		phone: {type: DataTypes.STRING},
	}, {
		sequelize,
		tableName: 'ERP_001T00U00'
	})
}