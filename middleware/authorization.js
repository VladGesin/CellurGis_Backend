const errH = require('../utils/error');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header('token');
    console.log(jwtToken);
    if (!jwtToken) {
      next(errH('Not Authorize', 403));
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
    next();
  } catch (error) {
    next(errH('Not Authorize', 403));
  }
};
