const { Model, DataTypes } = require("sequelize");


class Status extends Model{}

function init(sequelize){
	Status.init({
		status: {type: DataTypes.STRING, primaryKey: true},
		description: {type: DataTypes.STRING},
	}, {
		sequelize,
		tableName: 'ERP_001T00I00'
	});
}


module.exports = {
	Status, init
}
