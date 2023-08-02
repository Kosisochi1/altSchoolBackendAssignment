const fs = require('fs');
const path = require('path');
const folPath = path.join(__dirname, 'Names');

fs.rmdir(folPath, (err, res) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Folder deleted');
});
