const fs = require('fs');
const path = require('path');
const readfilePath = path.join(__dirname, 'Names', 'Kosisochukwu.js');

fs.readFile(readfilePath, 'utf-8', (err, res) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log(res);
});
