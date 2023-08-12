const http = require('http');
const path = require('path');
const fs = require('fs');

const inventoryDb = path.join(__dirname, 'inventory.json');
const HOSTNAME = 'localhost';
const PORT = 7000;

// create function that will handle request
function handleIventoryRequest(req, res) {
	res.setHeader('Content-Type', 'application/json');
	if (req.url === '/v1/inventory' && req.method === 'POST') {
		postFunction(req, res);
	}
	if (req.url.endsWith('/inventory') && req.method === 'GET') {
		getFunction(req, res);
	}
	//Function for getting one item from the data base

	// if (req.url.startsWith('/v1/inventory') && req.method === 'GET') {
	// 	getOneIventory(req, res);
	// }
	if (req.url.startsWith('/v1/inventory') && req.method === 'PUT') {
		putFunction(req, res);
	}
	if (req.url.startsWith('/v1/inventory') && req.method === 'DELETE') {
		deleteFunction(req, res);
	}
}

// create server
const server = http.createServer(handleIventoryRequest);
server.listen(PORT, HOSTNAME, () => {
	console.log(`Server Started at ${HOSTNAME}:${PORT}`);
});

const postFunction = (req, res) => {
	const inventoryBody = [];
	req.on('data', (chunks) => {
		inventoryBody.push(chunks);
	});
	req.on('end', () => {
		const inventoryToString = Buffer.concat(inventoryBody).toString();
		const inventoryToJson = JSON.parse(inventoryToString);
		fs.readFile(inventoryDb, 'utf-8', (err, dat) => {
			if (err) {
				res.writeHead(404);
				res.write('error');
				res.end();
			}
			const updatedInventory = JSON.parse(dat);
			const inventoryId = Math.floor(Math.random() * 400).toString();
			inventoryToJson.id = inventoryId;
			const allUpdatedIventory = [...updatedInventory, inventoryToJson];
			fs.writeFile(inventoryDb, JSON.stringify(allUpdatedIventory), (err) => {
				if (err) {
					res.writeHead(404);
					res.write('failed');
					res.end();
				}
				res.end(JSON.stringify(allUpdatedIventory));
			});
		});
	});
};

const getOneIventory = (req, res) => {
	res.setHeader('Content-Type', 'application');
	const id = req.url.split('/')[3];
	fs.readFile(inventoryDb, 'utf-8', (err, data) => {
		if (err) {
			res.writeHead(404);
			res.write('failed');
			res.end();
		}
		const inventoryReturned = JSON.parse(data);
		const singleInventory = inventoryReturned.findIndex(
			(oneInventory) => oneInventory.id === id
		);
		if (singleInventory === -1) {
			res.writeHead(404);
			res.write('Value not found');
			res.end();
		}
		console.log(singleInventory);
		const oneInventory = inventoryReturned[singleInventory];
		res.writeHead(200);
		res.write(JSON.stringify(oneInventory));
		res.end();
	});
};

function putFunction(req, res) {
	// res.setHeader('Content-Type', 'application/json');

	const id = req.url.split('/')[3];
	const inventoryBody = [];
	req.on('data', (chunks) => {
		inventoryBody.push(chunks);
	});
	req.on('end', () => {
		const inventoryToString = Buffer.concat(inventoryBody).toString();
		const inventoryToJson = JSON.parse(inventoryToString);
		// console.log(inventoryToJson);
		fs.readFile(inventoryDb, 'utf-8', (err, data) => {
			if (err) {
				res.writeHead(404);
				res.end();
			}
			const inventoryReturned = JSON.parse(data);
			const singleInventory = inventoryReturned.findIndex((oneInventory) => {
				return oneInventory.id === inventoryToJson.id;
			});
			const updatedInventory = {
				...inventoryReturned[singleInventory],
				...inventoryToJson,
			};
			inventoryReturned[singleInventory] = updatedInventory;

			fs.writeFile(inventoryDb, JSON.stringify(inventoryReturned), (err) => {
				if (err) {
					res.writeHead(404);
					res.write('File not recorded');
					res.end();
				}
				res.writeHead(200);
				res.write(JSON.stringify(inventoryReturned));
				res.end();
			});

			console.log(updatedInventory);
		});
	});
}

function deleteFunction(req, res) {
	const id = req.url.split('/')[3];
	const inventoryBody = [];
	req.on('data', (chunks) => {
		inventoryBody.push(chunks);
	});
	req.on('end', () => {
		const inventoryToString = Buffer.concat(inventoryBody).toString();
		const inventoryToJson = JSON.parse(inventoryToString);
		// console.log(inventoryToJson);
		fs.readFile(inventoryDb, 'utf-8', (err, data) => {
			if (err) {
				res.writeHead(404);
				res.end();
			}
			const inventoryReturned = JSON.parse(data);
			const singleInventory = inventoryReturned.findIndex((oneInventory) => {
				return oneInventory.id === inventoryToJson.id;
			});
			if (singleInventory === -1) {
				res.writeHead(404);
				res.write('Not found');
				res.end();
			}
			const deleteIventory = inventoryReturned.splice(singleInventory, 1);

			fs.writeFile(inventoryDb, JSON.stringify(inventoryReturned), (err) => {
				if (err) {
					res.writeHead(404);
					res.write('Not deleted');
					res.end();
				}
				res.writeHead(200);
				res.write();
				res.end();
			});

			// console.log(inventoryReturned);
		});
	});
}
function getFunction(req, res) {
	fs.readFile(inventoryDb, 'utf-8', (err, data) => {
		if (err) {
			res.writeHead(404);
			res.end(JSON.stringify({ massage: 'Not found' }));
		}
		res.setHeader('Content-Type', 'application/json');
		res.writeHead(200);
		res.write('Successful');
		res.write(data);
		res.end();
	});
}
