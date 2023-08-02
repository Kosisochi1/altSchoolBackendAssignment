const fs = require('fs');
const path = require('path');
const oldFileName = path.join(__dirname, 'Student');
const fileName = path.join(__dirname, 'Names');
fs.rename(oldFileName, fileName, (err, res) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Folder updated to Names');
});
