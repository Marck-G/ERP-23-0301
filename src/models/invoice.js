const { Model, DataTypes } = require("sequelize");
const { Budget } = require("./budget");
const { InvoiceStatus } = require("./invoice_status");

class Invoice extends Model{}

function init(sequelize){
	Invoice.init({
		uid: {type: DataTypes.STRING, primaryKey: true},
		date: {type: DataTypes.DATE},
		due_to: {type: DataTypes.DATE},
		description: {type: DataTypes.STRING},
	}, {
		sequelize,
		tableName: 'ERP_001T00I02'
	});
	Invoice.belongsTo(Budget, {as: 'budget'});
	Invoice.hasMany(InvoiceStatus, {as: 'changes'});
}


module.exports = {
	Invoice, init
}
