const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
	// sub is for subject : who is the subject for this token
}

exports.signin = function(req, res, next) {
	// user has already their email and password auth'd
	// We just need to give them a token
	// luckily passport's done method assigns the returned user to req.user so we can get that here

	res.send({ token : tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide an email and password' });
	}
	// See if a user with a given email exists
	User.findOne({ email: email }, function(err, existingUser){
		if (err) { return next(err); }

		// If a user with a given email does exist, return an error

		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		// If a user with an email does NOT exists, create and save user record
		const user = new User({
			email: email,
			password: password
		});

		user.save(function(err){
			if (err) {
				return next(err);
			}

			// Respond to request indicating the user was created
			res.json({ token: tokenForUser(user) });
		});

	});
};