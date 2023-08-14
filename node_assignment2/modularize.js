const http = require('http');
const path = require('path');
const fs = require('fs');
const { json } = require('node:stream/consumers');

const inventoryDb = path.join(__dirname, 'inventory.json');
const HOSTNAME = 'localhost';
const PORT = 7500;
const handleResponse =
	(req, res) =>
	({ code = 200, error = null, data = null }) => {
		res.setHeader('Content-Type', 'application/json');
		res.writeHead(code);
		res.write(JSON.stringify({ error, data }));
		res.end();
	};
const bodyPerser = (req, res, callback) => {
	const inventoryBody = [];
	req.on('data', (chunks) => {
		inventoryBody.push(chunks);
	});

	req.on('end', () => {
		if (inventoryBody.length) {
			const inventoryToString = Buffer.concat(inventoryBody).toString();
			inventoryToJson = JSON.parse(inventoryToString);
		}

		callback(req, res);
	});
};
// create function that will handle request
function handleIventoryRequest(req, res) {
	const response = handleResponse(req, res);

	// Function for POST method
	if (req.url === '/v1/inventory' && req.method === 'POST') {
		// const bodyPerser = (req, res, callback);

		fs.readFile(inventoryDb, 'utf-8', (err, items) => {
			if (err) {
				return response({ code: 404, error: 'Not found' });
			}
			const updatedInventory = JSON.parse(items);
			const inventoryId = Math.floor(Math.random() * 400).toString();
			inventoryToJson.id = inventoryId;
			const allUpdatedIventory = [...updatedInventory, inventoryToJson];
			console.log(allUpdatedIventory);
			fs.writeFile(inventoryDb, JSON.stringify(allUpdatedIventory), (err) => {
				if (err) {
					return response({ code: 404, error: 'Not Successful' });
				}
				return response({ code: 200, data: allUpdatedIventory });
			});
		});
	}

	//Function to GET inventory
	if (req.url === '/v1/inventory' && req.method === 'GET') {
		fs.readFile(inventoryDb, 'utf-8', (err, data) => {
			if (err) {
				return response({ code: 404, error: 'Not found' });
			}
			const inventoryReturned = JSON.parse(data);
			return response({ code: 200, data: inventoryReturned });
		});
	}
	if (req.url.startsWith('/v1/inventory') && req.method === 'GET') {
		const id = req.url.split('/')[3];
		fs.readFile(inventoryDb, 'utf-8', (err, data) => {
			if (err) {
				return response({ code: 404, error: 'Not found' });
			}
			const inventoryReturned = JSON.parse(data);
			const singleInventory = inventoryReturned.findIndex((oneInventory) => {
				return oneInventory.id === id;
			});
			if (singleInventory === -1) {
				return response({ code: 403, error: 'Index Not found' });
			}
			// console.log(singleInventory);

			const oneInventory = inventoryReturned[singleInventory];
			return response({ code: 200, data: oneInventory });
		});
	}
	//Function for Updating the Inventory
	if (req.url.startsWith('/v1/inventory') && req.method === 'PUT') {
		fs.readFile(inventoryDb, 'utf-8', (err, data) => {
			if (err) {
				return response({ code: 404, error: 'Not found' });
			}
			const inventoryReturned = JSON.parse(data);
			const singleInventory = inventoryReturned.findIndex((oneInventory) => {
				return oneInventory.id === inventoryToJson.id;
			});
			if (singleInventory === -1) {
				return response({ code: 404, error: 'Index Not found' });
			}
			const updatedInventory = {
				...inventoryReturned[singleInventory],
				...inventoryToJson,
			};
			inventoryReturned[singleInventory] = updatedInventory;
			fs.writeFile(inventoryDb, JSON.stringify(inventoryReturned), (err) => {
				if (err) {
					return response({ code: 404, error: 'Not Successful' });
				}
				return response({ code: 200, data: inventoryReturned });
			});
		});
		// putFunction(req, res);
	}
	if (req.url.startsWith('/v1/inventory') && req.method === 'DELETE') {
		fs.readFile(inventoryDb, 'utf-8', (err, data) => {
			if (err) {
				return response({ code: 404, error: 'Reading not successful' });
			}
			const inventoryReturned = JSON.parse(data);
			const singleInventory = inventoryReturned.findIndex((oneInventory) => {
				return oneInventory.id === inventoryToJson.id;
			});
			if (singleInventory === -1) {
				return response({ code: 404, error: 'Index not Found' });
			}
			const deleteIventory = inventoryReturned.splice(singleInventory, 1);
			fs.writeFile(inventoryDb, JSON.stringify(inventoryReturned), (err) => {
				if (err) {
					return response({ code: 404, error: 'Not successful' });
				}

				return response({ code: 200, data: inventoryReturned });
			});
		});
	}
}
// create server
const server = http.createServer((req, res) =>
	bodyPerser(req, res, handleIventoryRequest)
);

server.listen(PORT, HOSTNAME, () => {
	console.log(`Server Started at ${HOSTNAME}:${PORT}`);
});
//Create GET function !!!!
