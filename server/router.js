module.exports = function (app) {
	app.get('/', function(req, res, next){
		res.send(['waterbottle', 'phone', 'paper']);
	});

	// req is for request, it a bunch of data about the request made
	// res is a data that we respond to request
	// next is mostly for error handling
};