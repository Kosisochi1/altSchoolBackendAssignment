const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 5000;

const app = express();
app.use(express.static('html_file'));
const mainFile = path.join(__dirname, 'html_file', 'index.html');
const errorFile = path.join(__dirname, 'html_file', 'error.html');

const handleMain = (req, res) => {
	fs.readFile(mainFile, 'utf-8', (err, data) => {
		if (err) {
			res.status(404).end('not found');
		}
		res.status(200).sendFile(data);
	});
};

app.get('/index.html', handleMain);

app.get('*', (req, res) => {
	fs.readFile(errorFile, 'utf-8', (err, data) => {
		if (err) {
			res.status(404).end('not found');
		}
		res.status(404).sendFile(errorFile);
	});
});

app.listen(PORT, () => {
	console.log('Server Started');
});
