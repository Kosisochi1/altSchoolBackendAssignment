const http = require('http');
const fs = require('fs');
const path = require('path');

const htmlIndexPath = path.join(__dirname, 'index.html');
const htmlErrorPath = path.join(__dirname, 'error.html');

// Server service
const PORT = 8080;
const HOSTNAME = 'localhost';
// Function to handle request
function handleRequestFunction(req, res) {
	res.setHeader('Content-Type', 'text/html');

	if (req.url === '/index.html' && req.method === 'GET') {
		fs.readFile(htmlIndexPath, 'utf-8', (err, data) => {
			if (err) {
				res.writeHead(404);
				res.end();
			}
			res.writeHead(200);
			res.end(data);
		});
	}
	if (req.url === '/error.html' && req.method === 'GET') {
		const splitUrl = req.url.split('/');
		const theSplit = splitUrl[1];
		fs.readFile(htmlErrorPath, 'utf-8', (err, data) => {
			if (err) {
				res.writeHead(404);
				res.end(err);
			}
			res.writeHead(200);
			res.end(data);
		});
	}
}

// Create server and listen to the server
const server = http.createServer(handleRequestFunction);
server.listen(PORT, HOSTNAME, () => {
	console.log(`server started at ${HOSTNAME}:${PORT}`);
});
