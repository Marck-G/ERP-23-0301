const { Model, DataTypes } = require("sequelize");

class Document extends Model{}

function init(sequelize){
	Document.init({
		uid: {type: DataTypes.STRING, primaryKey: true},
		name: {type: DataTypes.STRING},
		version: {type: DataTypes.STRING},
		content: {type: DataTypes.BLOB}
	}, {
		sequelize,
		tableName: 'ERP_001T00U08'
	})
}

module.exports = {Document, init};
