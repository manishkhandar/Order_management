const User = require('../models/users')
const {v4 : uuidv4} = require('uuid')

exports.addUser = async (req, res) => {
	const { name, email, phoneNumber, password} = req.body;
	const userId = uuidv4();
	const {status, response} = await User.addUser(userId, name, email, phoneNumber ,password);
	res.status(status).json(response);
};

exports.loginUsers = async (req, res) => {
	const {phoneNumber, password, loginBy} = req.body;
	if(loginBy === 'google') {
		// need to work on this
	}
	const {status, response} = await User.loginUser(phoneNumber, password);
	res.status(status).json(response);
};
