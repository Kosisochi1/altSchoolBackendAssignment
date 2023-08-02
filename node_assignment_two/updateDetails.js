const fs = require('fs');
const path = require('path');
const UpDatedContent = `\nAge: 25 .years\n
    Sex: Male\n
  Nationality: Nigerian\n
 Phone: .07033751434\n
Hobby: Football`;
const myDir = path.join(__dirname, 'Names', 'user.js');
fs.appendFile(myDir, UpDatedContent, (err, res) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log(res);
});
