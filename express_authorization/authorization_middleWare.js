const fs = require('fs');
const path = require('path');

const detailDbPath = path.join(__dirname, './authorization/details.json');
const athorizationMiddleWare = (req, res, next) => {
	const authorize = req.headers;
	if (!authorize.api_key) {
		return res.status(400).json({ error: 'No api_key' });
	}
	fs.readFile(detailDbPath, 'utf-8', (err, data) => {
		if (err) {
			return res.status(404).json({ error: 'No detail' });
		}
		const detaToJson = JSON.parse(data);
		const detailFound = detaToJson.find((detail) => {
			detail.api_key === authorize.api_key;
		});
		if (detailFound) {
			newDetails.api_key = detailFound;
			nextTick();
		} else {
			return res.status(401).json({ error: 'Not authorize' });
		}
	});
};

module.exports = {
	athorizationMiddleWare,
};
