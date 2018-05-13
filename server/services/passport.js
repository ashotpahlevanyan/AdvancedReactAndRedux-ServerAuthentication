const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Set up options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
	// See if the user ID in the payload exists in our database
	// If it does, call 'done' with that user
	// otherwise call done without a user object

	User.findById(payload.sub, function (err, user) {
		if (err) {
			return done(err, false);
		}

		if (user) {
			done(null, user);  // could find a user
		} else {
			done(null, false);  // did a search but couldn't find a user
		}
	})
});

// Tell passport to use this Strategy
passport.use(jwtLogin);
