const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema  = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String
});


// Create the model class
const ModelClass = mongoose.model('user', userSchema);


// Export the model, so other parts of the application can make a use of it
module.exports = ModelClass;

