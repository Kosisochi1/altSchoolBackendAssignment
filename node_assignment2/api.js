const http = require('http');
const HOSTNAME = 'localhost';
const PORT = 7000;
//create Array to store the data will be created
const inventory = [];
// create function that will handle request
function handleIventoryRequest(req, res) {
	if (req.url === '/v1/inventory' && req.method === 'POST') {
		res.setHeader('Content-Type', 'application/json');
		postFunction(req, res);
	}
	if (req.url === '/v1/inventory' && req.method === 'GET') {
		res.end('GET');
	}
	if (req.url === '/v1/inventory' && req.method === 'PUT') {
		res.end('PUT');
	}
	if (req.url === '/v1/inventory' && req.method === 'DELETE') {
		res.end('DELETE');
	}
}

// create server
const server = http.createServer(handleIventoryRequest);
server.listen(PORT, HOSTNAME, () => {
	console.log(`Server Stsrted at ${HOSTNAME}:${PORT}`);
});
const postFunction = (req, res) => {
	const inventoryBody = [];
	req.on('data', (chunks) => {
		inventoryBody.push(chunks);
	});
	req.on('end', () => {
		const inventoryToString = Buffer.concat(inventoryBody).toString();
		const inventoryToJson = JSON.parse(inventoryToString);

		inventory.push({
			...inventoryToJson,
			id: Math.floor(Math.random() * 200).toString(),
		});
		res.writeHead(200);
		res.end(JSON.stringify(inventory));
		// console.log(inventory);
	});
};
