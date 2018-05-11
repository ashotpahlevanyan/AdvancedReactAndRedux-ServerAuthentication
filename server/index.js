// Main starting point for the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');  // logging framework
const router = require('./router');
const mongoose = require('mongoose');


// DB setup

mongoose.connect('mongodb://localhost:auth/auth')
	.catch(() => {});


// nodemon is for automatically restarting server on file change


const app = express();
// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log(`Server listening on ${port}`);