const { Model, DataTypes } = require("sequelize");

class User extends Model{}

function init(sequelize){
	User.init({
		uid: {type: DataTypes.STRING, primaryKey: true},
		userName: {type: DataTypes.STRING, allowNull: false},
		pass: {type: DataTypes.STRING, allowNull: false},
		email: {type: DataTypes.STRING, unique: true, allowNull: false},
		phone: {type: DataTypes.STRING},
	}, {
		sequelize,
		tableName: 'ERP_001T00U00'
	});
	User.hasOne(User, {as: 'manager'});
}

module.exports = {User, init};
