const express = require('express');
const router = express.Router();
const authMidd = require('../middleware/jwAuthMiddle');
const userController = require('../controllers/usersController');

router.post('/register', authMidd.findUser, authMidd.encryptPass, userController.createUser);
router.post('/login', authMidd.checkUser, authMidd.checkPass, userController.loginToken);

/*Login

1. distructed body
2. check if excited
3.check pass correct
4. return the token
*/

module.exports = router;
