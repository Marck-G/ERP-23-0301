const { Model, DataTypes } = require("sequelize");
const { BudgetRow } = require("./budget_row");
const { Company } = require("./company");
const { Discount } = require("./discounts");
const { Project } = require("./project");
const { User } = require("./user");

class Template extends Model{}

function init(sequelize){
	Template.init({
		uid: {type: DataTypes.STRING, primaryKey: true},
		name: {type: DataTypes.STRING},
		code: {type: DataTypes.STRING},
		description: {type: DataTypes.STRING},
		data: {type: DataTypes.BLOB},
		version: {type: DataTypes.STRING},
		keys: {type:  DataTypes.STRING}
	}, {
		sequelize,
		tableName: 'ERP_001T00T01'
	});
}


module.exports = {
	Template, init
}
