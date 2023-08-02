const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'Student');
fs.mkdir(filepath, (err, res) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log(`file successfulllly created `);
});
