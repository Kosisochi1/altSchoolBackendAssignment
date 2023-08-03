const http = require('http');
const HOSTNAME = 'localHost';
const PORT = 8000;
const handleListin = function (req, res) {
	res.writeHead(200);
	res.write('Hello World');
	res.end();
};
const server = http.createServer(handleListin);
server.listen(PORT, HOSTNAME, () => {
	console.log('Server Started');
});
