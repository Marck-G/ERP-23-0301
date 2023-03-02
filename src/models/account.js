const { Model, DataTypes } = require("sequelize");

class Account extends Model{}

function init(sequelize){
	Account.init({
		uid: {type: DataTypes.STRING, primaryKey: true},
		name: {type: DataTypes.STRING},
		bank: {type: DataTypes.STRING},
		swift: {type: DataTypes.STRING},
		country: {type: DataTypes.STRING},
		number: {type: DataTypes.STRING},
	}, {
		sequelize,
		tableName: 'ERP_001T00U03'
	})
}


module.exports = {Account, init}