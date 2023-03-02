const { Model, DataTypes } = require("sequelize");
const { BudgetRow } = require("./budget_row");
const { Company } = require("./company");
const { Discount } = require("./discounts");
const { InvoiceStatus } = require("./invoice_status");
const { Project } = require("./project");
const { Document } = require("./document");
const { User } = require("./user");

class Budget extends Model{}

function init(sequelize){
	Budget.init({
		uid: {type: DataTypes.STRING, primaryKey: true},
		code: {type: DataTypes.STRING},
		code: {type: DataTypes.STRING},
		description: {type: DataTypes.STRING},
	}, {
		sequelize,
		tableName: 'ERP_001T00U09'
	});
	Budget.belongsTo(Project, {as: 'project'});
	Budget.belongsTo(Company, {as: 'client'});
	Budget.hasMany(Discount, {as: 'discounts'});
	Budget.belongsTo(User, {as: 'createdBy'});
	Budget.belongsTo(User, {as: 'reviewBy'});
	Budget.belongsTo(User, {as: 'approbedBy'});
	Budget.hasMany(BudgetRow, {as: 'rows'})
	Budget.hasMany(Document, {as: 'document'});
	Budget.hasMany(InvoiceStatus, {as: 'state'});
}


module.exports = {
	Budget, init
}
