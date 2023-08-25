const fs = require('fs');
const path = require('path');
const detailsDbPath = path.join(__dirname, 'details.json');
const controller_function = (req, res) => {
	const newDetails = req.body;
	newDetails.api_key = `${newDetails.Name}_${newDetails.password}`;
	fs.readFile(detailsDbPath, 'utf-8', (err, data) => {
		if (err) {
			return res.status(404).json({ error: 'No details found' });
		}
		if (newDetails.level === 2) {
			newDetails.level_type = 'admin';
		} else {
			newDetails.level_type = 'user';
		}
		const oldDetails = JSON.parse(data);
		const existingUser = oldDetails.find((user) => {
			return user.Name === newDetails.Name;
		});
		if (existingUser) {
			return res.status(400).json({ massage: 'Existing user' });
		}
		const allDetails = [...oldDetails, newDetails];
		const savedDetails = JSON.stringify(allDetails);
		fs.writeFile(detailsDbPath, savedDetails, (err) => {
			if (err) {
				return res.status(404).json({ error: 'Details not save' });
			}
			return res.status(201).json({ data: allDetails });
		});
	});
};
module.exports = {
	controller_function,
};
