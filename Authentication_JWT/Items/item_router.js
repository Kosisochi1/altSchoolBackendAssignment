const express = require('express');
const middleware = require('./item_middleware');
const controller = require('./item_controller');
const globalMiddleWare = require('../globalMware/globalMiddleWare');
const router = express.Router();

router.post(
	'/item',
	middleware.validateItem,
	globalMiddleWare.authenticateToken,
	controller.createItem
);
router.get('/getAll', globalMiddleWare.authenticateToken, controller.findItem);
router.get('/:id', globalMiddleWare.authenticateToken, controller.findOneItem);
router.put(
	'/:id',
	middleware.validateItem,
	globalMiddleWare.authenticateToken,
	controller.updateItem
);
router.delete(
	'/:id',
	globalMiddleWare.authenticateToken,
	controller.deleteItem
);
module.exports = router;
