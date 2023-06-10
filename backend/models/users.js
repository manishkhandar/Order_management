const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
	userId: String,
	name: String,
	email: String,
	phoneNumber: Number,
	password: String,
});
const User = mongoose.model('User', userSchema);

exports.addUser = async (userId, name, email, phoneNumber, password) => {
	try {
		const existingUserEmail = await User.findOne({email});
		const existingUserPhoneNumber = await User.findOne({phoneNumber});
		if (existingUserEmail || existingUserPhoneNumber) {
			return { status:404, response: { status:404, message: 'User already exists'}};
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({userId, name, email, phoneNumber, password: hashedPassword });
		await newUser.save();

		const token = jwt.sign({userId: userId}, 'RANDOM_TOKEN_SECRET',{expiresIn: '24h'});
		return { status:200, response: {  status:200, message: "User added successfully", token: token , userDetails: newUser}};
	} catch (err) {
		console.error('Failed to add user', err);
		return { status:500, response:{ status:500, message: 'Failed to add user' }};
	}
};


exports.loginUser = async (phoneNumber, password) => {
	try {
		const userExist = await User.findOne({phoneNumber: phoneNumber});
		if (!userExist) {
			return { status:404, response: { status:404, message: 'User doesnot exists' }};
		}
		if (!bcrypt.compareSync(password, userExist.password)) {
			return { status:401, response:{ status:401, message: 'Invalid password' }};
		}
		const token = jwt.sign({userId: userExist.userId}, 'RANDOM_TOKEN_SECRET',{expiresIn: '24h'});
		return { status: 200, response:{ status:200, message: "Login successfully", token: token , userDetails: userExist}};
	} catch (err) {
		console.error('Failed to login', err);
		return { status:500,  response: { status:500, message: 'Failed to login' }};
	}
};