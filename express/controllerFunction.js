const path = require('path');
const fs = require('fs');
const { Console } = require('console');

const inventoryDb = path.join(__dirname, 'dBase', 'data.json');

const getFunction = (req, res) => {
	const { search, limit } = req.query;
	fs.readFile(inventoryDb, 'utf-8', (err, data) => {
		if (err) {
			res.status(404).json({ error: 'Not Found' });
		}

		const inventoryReturned = JSON.parse(data);
		let inventoryQuery = [...inventoryReturned];
		if (search) {
			inventoryQuery = inventoryQuery.filter((queryItem) => {
				return queryItem.size.includes(search);
			});
		}
		if (limit) {
			inventoryQuery = inventoryQuery.slice(0, limit - 1);
		}

		res.status(200).json({ data: inventoryQuery });
	});
	// console.log(query);
};

const getOneFunction = (req, res) => {
	const id = req.params.id;
	fs.readFile(inventoryDb, 'utf-8', (err, data) => {
		if (err) {
			res.status(404).json({ error: 'Not Found' });
		}
		const inventoryReturn = JSON.parse(data);
		const singleInventory = inventoryReturn.find(
			(oneIventory) => oneIventory.id === id
		);
		res.status(200).json({ data: singleInventory });
	});
};

const postFunction = (req, res) => {
	fs.readFile(inventoryDb, 'utf-8', (err, data) => {
		if (err) {
			res.status(404).json({ error: 'Not Found' });
		}
		const inventoryReturn = JSON.parse(data);
		const inventoryId = Math.floor(Math.random() * 400).toString();
		inventoryToString.id = inventoryId;

		const allUpdatedIventory = [...inventoryReturn, inventoryToString];
		fs.writeFile(inventoryDb, JSON.stringify(allUpdatedIventory), (err) => {
			if (err) {
				res.status(404).json({ error: 'Not Successfull' });
			}
			res.status(201).json({ data: allUpdatedIventory });
		});
	});
};

const putFunction = (req, res) => {
	fs.readFile(inventoryDb, 'utf-8', (err, data) => {
		if (err) {
			res.status(404).json({ error: 'Not Found' });
		}
		const inventoryToJson = JSON.parse(data);
		const singleInventory = inventoryToJson.findIndex((oneIventory) => {
			return oneIventory.id === inventoryToString.id;
		});
		if (singleInventory === -1) {
			res.status(404).json({ error: 'Index Not Found' });
		}
		const updatedInventory = {
			...inventoryToJson[singleInventory],
			...inventoryToString,
		};
		inventoryToJson[singleInventory] = updatedInventory;
		fs.writeFile(inventoryDb, JSON.stringify(inventoryToJson), (err) => {
			if (err) {
				res.status(404).json({ error: 'Not Successfull' });
			}
			res.status(205).json({ data: updatedInventory });
		});
	});
};

const deleteFunction = (req, res) => {
	fs.readFile(inventoryDb, 'utf-8', (err, data) => {
		if (err) {
			res.status(404).json({ error: 'Not Found' });
		}
		const inventoryToJson = JSON.parse(data);
		const singleInventory = inventoryToJson.findIndex((oneIventory) => {
			return oneIventory.id === inventoryToString.id;
		});
		if (singleInventory === -1) {
			res.status(404).json({ error: 'Not Found' });
		}
		const deleteInventory = inventoryToJson.splice(singleInventory, 1);
		fs.writeFile(inventoryDb, JSON.stringify(inventoryToJson), (err) => {
			if (err) {
				res.status(404).json({ error: 'Not Successful' });
			}
			res.status(200).json({ data: inventoryToJson });
		});
	});
};

module.exports = {
	getFunction,
	getOneFunction,
	postFunction,
	putFunction,
	deleteFunction,
};
