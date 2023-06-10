const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors')
dotenv.config();

 

//db connection
mongoose.connect(
	process.env.MONGO_URI,
	{useNewUrlParser: true}
).then(() => console.info('DB Connected'))

mongoose.connection.on('error', err => {
	console.info(`DB connection error: ${err.message}`)
});

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-requested-with');
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Credentials', 'Authorization, Content-Type');
	next();
});
app.use("/", routes.users);
app.use("/", routes.order);

const port = process.env.PORT || env.PORT;

app.listen(port , () => {
	console.info(`app is listening to port :${port}`);
});