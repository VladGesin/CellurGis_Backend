const { Pool } = require('pg');

const pool = new Pool({
	user: 'postgres',
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	database: 'gis_app'
});

module.exports = pool;
