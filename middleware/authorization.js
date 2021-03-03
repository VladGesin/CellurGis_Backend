const errH = require('../utils/error');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    // const jwtToken = req.header('token');
    const bearerHeader = req.headers.authorization;
    console.log(bearerHeader);
    if (!bearerHeader) {
      next(errH('Not Authorize', 403));
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    const payload = jwt.verify(token, process.env.jwtSecret);
    req.user = payload.user;
    console.log(req.user);
    next();
  } catch (error) {
    next(errH('Not Authorize', 403));
  }
};
