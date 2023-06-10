const Order = require('../models/order')
const {v4 : uuidv4} = require('uuid')

exports.addOrder = async (req, res) => {
	const {userId, subTotal, phoneNumber} = req.body;
	const orderId = uuidv4();
	const {status, response} = await Order.addOrder(orderId, userId, subTotal, phoneNumber);
	res.status(status).json(response);
};

exports.getOrder = async (req, res) => {
	const userId = req.query.userId;
	const {status, response} = await Order.getOrder(userId);
	res.status(status).json(response);
};
