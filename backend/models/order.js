const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	orderId: String,
	userId: String,
	subTotal: Number,
	phoneNumber: String,
});
const Order = mongoose.model('Order', orderSchema);


exports.addOrder = async (orderId, userId, subTotal, phoneNumber) => {

	try {
		const newOder = new Order({ orderId, userId, subTotal, phoneNumber});
		await newOder.save();
		return { status:200, response: {message: 'order added successfully' }};
	} catch (err) {
		console.error('Failed to add order', err);
		return { status:500, response: {message: 'Failed to add order' }};
	}
};


exports.getOrder = async (userId) => {

	try {
		const orders = await Order.find({ userId: userId });
		return { status:200, response: {message: 'Order Details', orders: orders}};
	} catch (err) {
		console.error('Failed to get order', err);
		return { status:500, response: {message: 'Failed to get order' }};
	}
};