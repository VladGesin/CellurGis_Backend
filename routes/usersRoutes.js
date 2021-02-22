const express = require('express');
const router = express.Router();
const authMidd = require('../middleware/jwAuthMiddle');
const userController = require('../controllers/usersController');
const validInfo = require('../middleware/validation');
const authorization = require('../middleware/authorization');
const verifyController = require('../controllers/veryfyController');

//Register New User
router.post(
  '/register',
  validInfo,
  authMidd.findUser,
  authMidd.encryptPass,
  userController.createUser
);

//Login User
router.post(
  '/login',
  validInfo,
  authMidd.checkUser,
  authMidd.checkPass,
  userController.loginToken
);

//Verify Token as you login in
router.get('/is-verify', authorization, verifyController.isVerify);

module.exports = router;
