const { Model, DataTypes } = require("sequelize");
const { Document } = require("./document");
const { User } = require("./user");

class Project extends Model{}

function init(sequelize){
	Project.init({
		uid: {type: DataTypes.STRING, primaryKey: true},
		name: {type: DataTypes.STRING},
		code: {type: DataTypes.STRING},
		description: {type: DataTypes.STRING},
		hours: {type: DataTypes.INTEGER}
	}, {
		sequelize,
		tableName: 'ERP_001T00U02'
	})
	Project.belongsTo(User, {as: 'manager'});
	Project.hasMany(Document, {as: 'docuemnts'});
}

module.exports = {Project, init};
