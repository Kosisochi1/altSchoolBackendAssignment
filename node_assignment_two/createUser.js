const fs = require('fs');
const path = require('path');
const myFile = path.join(__dirname, 'Student', 'user.js');

fs.writeFile(myFile, '', (err, res) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log('File created successfully');
});
