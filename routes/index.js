
/*
 * GET home page.
 */
var Intr = require('../models/intr.js');

exports.index = function(req, res){
	Intr.find({}).desc('_id').run(function(err, intr) {
		res.render('index', { title: 'Express', intr: intr })
	});
};