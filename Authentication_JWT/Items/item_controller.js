const Items = require('../models/item');

const createItem = async (req, res) => {
	const reqItem = req.body;
	const item = await Items.create(reqItem);
	return res.status(201).json({
		massage: 'Item created',
		item,
	});
};

const findItem = async (req, res) => {
	reqItem = req.params.id;
	console.log(reqItem);
	const OneItem = await Items.findAll();
	return res.status(200).json({
		massage: 'Item found',
		OneItem: OneItem,
	});
};
const findOneItem = async (req, res) => {
	const reqId = req.params.id;
	try {
		const findItem = await Items.findByPk(reqId);

		return res.status(200).json({
			massage: 'updated',
			findItem: findItem,
		});
	} catch (error) {
		return res.status(401).json({
			massage: 'Item updated',
			success: false,
		});
	}
};
const updateItem = async (req, res) => {
	const reqId = req.params.id;
	const reqUpdate = req.body;
	try {
		const findItem = await Items.findOne({
			where: {
				id: reqId,
			},
		});
		if (findItem) {
			const itemUpdate = await Items.update(reqUpdate, {
				where: { id: reqId },
			});
			return res.status(200).json({
				massage: 'Item updated',
				itemUpdate: itemUpdate,
			});
		}
	} catch (error) {
		return res.status(404).json({
			massage: 'Item not updated',
		});
	}
};
const deleteItem = async (req, res) => {
	const reqId = req.params.id;
	try {
		const ItemExist = await Items.findOne({ where: { id: reqId } });
		if (ItemExist) {
			const itemDelete = await Items.destroy({ where: { id: reqId } });
		}
		return res.status(200).json({
			massage: 'Item deleted',
			success: true,
		});
	} catch (error) {
		return res.status(404).json({
			massage: 'Item was not deleted',
			success: false,
		});
	}
};

module.exports = {
	createItem,
	findItem,
	findOneItem,
	updateItem,
	deleteItem,
};
