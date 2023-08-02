const fs = require('fs');
const path = require('path');
const contentfile = 'Name: Emmanuel .Kosisochukwu .Ezeoyiri';
const contentPath = path.join(__dirname, 'Names', 'user.js');
fs.writeFile(contentPath, contentfile, (err, res) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log('My name added as a content');
});
