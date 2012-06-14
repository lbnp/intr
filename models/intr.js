var mongoose = require('mongoose')
,	Schema = mongoose.Schema

var intrSchema = new Schema({
	time: Date,
	who: String,
	what: String
});

module.exports = mongoose.model('Intr', intrSchema);

