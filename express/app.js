const express = require('express');

const app = express();
const PORT = 4000;
app.get('/', (req, res) => {
	res.status(200);
	res.send('Welcome to my server service');
});

app.listen(PORT, () => {
	console.log('Server Started');
});
