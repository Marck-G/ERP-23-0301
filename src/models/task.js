const { Model, DataTypes } = require("sequelize");
const { Document } = require("./document");
const { Project } = require("./project");
const { User } = require("./user");

class Task extends Model{}

function init(sequelize){
	Task.init({
		uid: {type: DataTypes.STRING, primaryKey: true},
		name: {type: DataTypes.STRING},
		code: {type: DataTypes.STRING},
		description: {type: DataTypes.STRING},
		comments: {type: DataTypes.BLOB},
		dedicated_time : {type: DataTypes.FLOAT}
	}, {
		sequelize,
		tableName: 'ERP_001T00U10'
	})
	Task.belongsTo(User, {as: 'manager'});
	Task.belongsTo(User, {as: 'crafter'});
	Task.belongsTo(User, {as: 'worker'});
	Task.hasMany(Document, {as: 'documents'});
	Task.hasOne(Task, {as: 'father'});
	Task.belongsTo(Project)
}

module.exports = {Task, init};
