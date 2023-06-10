const express = require('express');
const router = express.Router();
const orderController = require('../controller/order');
const jwt = require('jsonwebtoken')


function verifyToken(req, res, next) {
	const token = req.headers['authorization'];
	if (!token) {
		return res.status(401).json({ message: 'Missing token' });
	}

	console.info("JWT token verified");
  
	jwt.verify(token, 'RANDOM_TOKEN_SECRET', (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: 'Invalid token' });
		}
		req.userId = decoded.userId;
		next();
	});
}

router.post('/add-order', verifyToken, orderController.addOrder);
router.get('/get-order', verifyToken, orderController.getOrder);


module.exports = router