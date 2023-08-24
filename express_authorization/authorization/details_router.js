const express = require('express');
const detailsMidlleWare = require('./details_middleWare');
const detailsController = require('./details_controller');
const router = express.Router();
router.post(
	'/',
	detailsMidlleWare.checkDetailsBody,
	detailsMidlleWare.authorizeCheck,
	detailsController.controller_function
);
module.exports = router;
