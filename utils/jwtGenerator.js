const jwt = require('jsonwebtoken');
require('dotenv').config;

const jwtGenerator = (user_id) => {
	const paylaod = {
		user: user_id
	};
	return jwt.sign(paylaod, process.env.jwtSecret, { expiresIn: '1hr' });
};

module.exports = { jwtGenerator: jwtGenerator };
