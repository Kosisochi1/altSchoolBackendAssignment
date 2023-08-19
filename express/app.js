const express = require('express');
const controller = require('./controllerFunction');
const middleWare = require('./middleWare');
const bodyParser = require('body-parser');

const PORT = 5000;
const app = express();
const app_router = express.Router();

app.use(bodyParser.json());
app.use(express.json());

app_router.get('/v1/inventory', controller.getFunction);
app_router.get('/v1/inventory/:id', controller.getOneFunction);
app_router.post(
	'/v1/inventory',
	middleWare.middleWarecheck,
	controller.postFunction
);
app_router.put(
	'/v1/inventory/:id',
	middleWare.middleWarecheck,
	controller.putFunction
);
app_router.delete(
	'/v1/inventory',
	middleWare.middleWarecheck,
	controller.deleteFunction
);
app.listen(PORT, () => {
	console.log(`Server started at localhost:${PORT}`);
});
