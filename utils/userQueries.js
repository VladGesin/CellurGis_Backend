const db = require('./db');
const jwtG = require('./jwtGenerator');

const findUser = async (email) => {
	try {
		const user = await db.query('SELECT * FROM users WHERE user_email = $1 ', [ email ]);
		return user.rows;
	} catch (error) {
		console.error(err.message);
	}
};

const createUser = async (user, email, pass) => {
	try {
		const newUser = await db.query(
			'INSERT INTO users(user_name,user_email,user_password) VALUES($1, $2, $3) RETURNING *',
			[ user, email, pass ]
		);
		const token = jwtG.jwtGenerator(newUser.rows[0].user_id);

		return token;
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	findUser: findUser,
	createUser: createUser
};
