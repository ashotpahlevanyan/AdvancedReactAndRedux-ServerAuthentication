const User = require('../models/user');

exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	// See if the user with a given email exists
	User.findOne({ email: email}, function(err, existingUser) {

	});

	// If a user with a given email does exist, return error

	// If a user with a given email doesn't exist, create and save user record

	// Respond to request indicating the user was created

};
