const { Model, DataTypes } = require("sequelize");
const { Account } = require("./account");
const {  Staff } = require("./staff");
const { User } = require("./user");

class Company extends Model{}

function init(sequelize){
	Company.init({
		uid: {type: DataTypes.STRING, primaryKey: true},
		name: {type: DataTypes.STRING},
		cif: {type: DataTypes.STRING},
		vat: {type: DataTypes.STRING},
		dir: {type: DataTypes.STRING},
		email: {type: DataTypes.STRING},
		tel: {type: DataTypes.STRING},
		img: {type: DataTypes.BLOB}
	}, {
		sequelize,
		tableName: 'ERP_001T00U05'
	})
	Company.hasMany(Account, {as: 'accounts'});
	Company.hasMany(Staff, {as: 'staff'});
}


module.exports = {
	Company, init
}
