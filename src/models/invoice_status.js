const { Model, DataTypes } = require("sequelize");
const { Status } = require("./status");
const { User } = require("./user");

class InvoiceStatus extends Model{}

function init(sequelize){
	InvoiceStatus.init({
		uid: {type: DataTypes.STRING, primaryKey: true},
		changed: {type: DataTypes.DATE}
	}, {
		sequelize,
		tableName: 'ERP_001T00I01'
	});
	InvoiceStatus.belongsTo(Status, {as: 'status'});
	InvoiceStatus.belongsTo(User, {as: 'author'})
	// InvoiceStatus.belongsToMany(Invoice, {'as': 'invoice'});
}


module.exports = {
	InvoiceStatus, init
}
