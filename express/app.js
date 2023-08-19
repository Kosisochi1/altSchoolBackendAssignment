const express = require('express');
const controller = require('./controllerFunction');
const middleWare = require('./middleWare');
const bodyParser = require('body-parser');

const PORT = 5000;
const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.get('/v1/inventory', controller.getFunction);
app.get('/v1/inventory/:id', controller.getOneFunction);
app.post('/v1/inventory', middleWare.middleWarecheck, controller.postFunction);
app.put(
	'/v1/inventory/:id',
	middleWare.middleWarecheck,
	controller.putFunction
);
app.delete(
	'/v1/inventory',
	middleWare.middleWarecheck,
	controller.deleteFunction
);
app.listen(PORT, () => {
	console.log(`Server started at localhost:${PORT}`);
});
