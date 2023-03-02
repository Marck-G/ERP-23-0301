const { Model, DataTypes } = require("sequelize");

class BudgetRow extends Model{}

function init(sequelize){
	BudgetRow.init({
		uid: {type: DataTypes.STRING, primaryKey: true},
		code: {type: DataTypes.STRING},
		price: {type: DataTypes.FLOAT},
		description: {type: DataTypes.STRING},
		vat: {type: DataTypes.STRING},
		total: {type: DataTypes.FLOAT},
		row_index: {type: DataTypes.INTEGER},
	}, {
		sequelize,
		tableName: 'ERP_001T00U06'
	});
}


module.exports = {
	BudgetRow, init
}
