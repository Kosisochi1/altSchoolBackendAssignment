const express = require('express');
const controller = require('./control_function');
const middleWare = require('./middleWare');
const authenticate = require('./authorization_middleWare');
// const bodyParser = require('body-parser');

// const PORT = 5000;
// const app = express();
const app_router = express.Router();

app_router.get('/', controller.getFunction);
app_router.get('/:id', controller.getOneFunction);
app_router.post(
	'/',
	authenticate.athorizationMiddleWare,
	middleWare.middleWarecheck,
	controller.postFunction
);
app_router.put('/:id', middleWare.middleWarecheck, controller.putFunction);
app_router.delete('/', middleWare.middleWarecheck, controller.deleteFunction);
// app.listen(PORT, () => {
// 	console.log(`Server started at localhost:${PORT}`);
// });
module.exports = app_router;
