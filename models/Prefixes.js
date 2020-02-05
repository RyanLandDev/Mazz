module.exports = (sequelize, DataTypes) => {
	return sequelize.define('prefixes', {
		guild: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		prefix: {
			type: DataTypes.STRING,
			defaultValue: 'm!',
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};