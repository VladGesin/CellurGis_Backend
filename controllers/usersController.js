const jwAuthQ = require('../utils/userQueries');
const jwtG = require('../utils/jwtGenerator');

const createUser = async (req, res, next) => {
	try {
		const { user, email } = req.body;
		const pass = req.newPass;
		const newUserToken = await jwAuthQ.createUser(user, email, pass);
		res.status(200).json({ token: newUserToken });
	} catch (error) {
		next(error);
	}
};

const loginToken = async (req, res, next) => {
	try {
		const { email } = req.body;
		const user = await jwAuthQ.findUser(email);
		const token = jwtG.jwtGenerator(user[0].user_id);
		res.status(200).json({ token: token });
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	createUser: createUser,
	loginToken: loginToken
};
