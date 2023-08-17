const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const PORT = 5000;
const app = express();

const inventoryDb = path.join(__dirname, 'dBase', 'data.json');
app.use(bodyParser.json());
app.use(express.json());

app.get('/v1/inventory', (req, res) => {
	fs.readFile(inventoryDb, 'utf-8', (err, data) => {
		if (err) {
			res.status(404).send('Not Found');
		}
		const mett = JSON.parse(data);
		res.status(200).json(mett);
	});
});
app.get('/v1/inventory/:id', (req, res) => {
	const id = req.params.id;
	fs.readFile(inventoryDb, 'utf-8', (err, data) => {
		if (err) {
			res.status(404).send('Not Found');
		}
		const inventoryReturn = JSON.parse(data);
		const singleInventory = inventoryReturn.find(
			(oneIventory) => oneIventory.id === id
		);
		res.status(200).send(singleInventory);
	});
});
app.post('/v1/inventory', (req, res) => {
	const inventoryToString = req.body;
	fs.readFile(inventoryDb, 'utf-8', (err, data) => {
		if (err) {
			res.status(404).send('Not Found');
		}
		const inventoryReturn = JSON.parse(data);
		const inventoryId = Math.floor(Math.random() * 400).toString();
		inventoryToString.id = inventoryId;

		const allUpdatedIventory = [...inventoryReturn, inventoryToString];
		console.log(allUpdatedIventory);
	});
	res.send(inventoryToString);
});

app.listen(PORT, () => {
	console.log(`Server started at localhost:${PORT}`);
});
