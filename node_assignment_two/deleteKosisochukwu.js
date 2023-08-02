const fs = require('fs');
const path = require('path');
const delefile = path.join(__dirname, 'Names', 'Kosisochukwu.js');
fs.rm(delefile, (err, res) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log('File removed');
});
