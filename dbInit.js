const Sequelize = require('sequelize');

const db = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// sqlite only
	storage: 'database.sqlite',
});

const CurrencyShop = db.import('models/CurrencyShop');
db.import('models/Users');
db.import('models/UserItems');
db.import('models/Prefixes');

const force = process.argv.includes('--force') || process.argv.includes('-f');

db.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Tea', cost: 1 }),
		CurrencyShop.upsert({ name: 'Coffee', cost: 2 }),
		CurrencyShop.upsert({ name: 'Cake', cost: 5 }),
	];
	await Promise.all(shop);
	console.log('Database synced');
	db.close();
}).catch(console.error);