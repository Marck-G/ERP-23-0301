const { Model, DataTypes } = require("sequelize");

class Discount extends Model{}

function init(sequelize){
	Discount.init({
		uid: {type: DataTypes.STRING, primaryKey: true},
		code: {type: DataTypes.STRING},
		value: {type: DataTypes.STRING},
		relative: {type: DataTypes.BOOLEAN},
		due_to: {type: DataTypes.DATE},
	}, {
		sequelize,
		tableName: 'ERP_001T00U07'
	});
}

module.exports = {
	Discount, init
}
