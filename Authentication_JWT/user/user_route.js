const express = require('express');
const user_controller = require('./user_controller');
const user_middleWare = require('./user_middleware');
const app = express();
const router = express.Router();

router.post(
	'/signup',
	user_middleWare.validateUser,
	user_controller.createUser
);
router.post(
	'/login',
	user_middleWare.LoginValidator,
	user_controller.UserLogin
);

module.exports = router;
