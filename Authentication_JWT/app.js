const express = require('express');
const sequelize = require('./config/sequelize');
const user_route = require('./user/user_route');
const bodyParser = require('body-parser');
const userModel = require('./models/user');
const itemModel = require('./models/item');
const item_router = require('./Items/item_router');

//
require('dotenv').config();
const PORT = process.env.DB_PORT;
const app = express();

app.use(bodyParser.json());
app.use('/user', user_route);
app.use('/login', user_route);
app.use('/item', item_router);

sequelize
	.authenticate()
	.then(() => {
		console.log('connected to the DB successfully');
	})
	.catch((error) => {
		console.log(error);
	});
app.listen(PORT, () => {
	console.log('Server started');
});
