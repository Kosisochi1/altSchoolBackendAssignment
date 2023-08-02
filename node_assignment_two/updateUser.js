const fs = require('fs');
const path = require('path');
const oldUser = path.join(__dirname, 'Names', 'user.js');
const newUser = path.join(__dirname, 'Names', 'Kosisochukwu.js');

fs.rename(oldUser, newUser, (err, res) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log('User updated to Kosisochukwu');
});
