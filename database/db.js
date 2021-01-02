const { Pool } = require('pg');

const pool = new Pool({
	user: 'postgres',
	password: 'gmail100',
	host: 'localhost',
	port: 5432,
	database: 'gis_app'
});

module.exports = pool;
