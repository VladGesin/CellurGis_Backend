const jwAuthQ = require('../utils/userQueries');
const errH = require('../utils/error');
const bcrypt = require('bcrypt');

const checkPass = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await jwAuthQ.findUser(email);
    const validPassword = await bcrypt.compare(
      password,
      userData[0].user_password
    );
    if (!validPassword) throw errH('Email or Password is incorrect', 401);
    next();
  } catch (error) {
    next(error);
  }
};

const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userData = await jwAuthQ.findUser(email);
    if (userData.length !== 0) next();
    else throw errH('Email or Password is incorrect', 401);
  } catch (error) {
    next(error);
  }
};

const findUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userData = await jwAuthQ.findUser(email);
    if (userData.length === 0) next();
    else throw errH('User Already exist', 401);
  } catch (error) {
    next(error);
  }
};

const encryptPass = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const bcryptPassword = await bcrypt.hash(password, salt);
  req.newPass = bcryptPassword;
  next();
};

module.exports = {
  findUser: findUser,
  encryptPass: encryptPass,
  checkUser: checkUser,
  checkPass: checkPass,
};
