const checkDetailsBody = (req, res, next) => {
	const reqBody = req.body;
	if (!reqBody) {
		return res.status(400).json({ error: 'No Request Body' });
	}
	next();
};
const authorizeCheck = (req, res, next) => {
	if (!req.body.Name || !req.body.Name.trim()) {
		return res.status(400).json({ error: 'Input your Name' });
	}
	if (!req.body.password || !req.body.password.trim()) {
		return res.status(400).json({ error: 'Input your password' });
	}
	if (!req.body.level) {
		return res.status(400).json({ error: 'Input your level' });
	}
	if (!req.body.level_type || !req.body.level_type.trim()) {
		return res.status(400).json({ error: 'Input your level type' });
	}
	next();
};

module.exports = {
	checkDetailsBody,
	authorizeCheck,
};
