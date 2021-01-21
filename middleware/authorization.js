const errH = require('../utils/error');

module.exports = async (req, res, next) => {
	try {
	} catch (error) {
		console.error(err.massage);
		throw errH('Not Authorize', 403);
	}
};
