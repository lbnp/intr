
/**
 * Module dependencies.
 */

var express = require('express')
,	mongoose = require('mongoose')
  , routes = require('./routes')
,	Intr = require('./models/intr.js');

var app = module.exports = express.createServer();

// Configuration

mongoose.connect('mongodb://localhost/intr');

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
	app.use(express.session({secret: 'intr'}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.post('/intr', function(req, res) {
	if (req.body.who) {
		var what = undefined;
		if (req.body.what.length > 0) {
			what = req.body.what;
		}
		new Intr({time: new Date, who: req.body.who, what: what }).save(function(err) {
			res.redirect('/');
		});
	}
});
app.del('/delete', function(req, res) {
	Intr.remove({_id: req.body.key}, function(err) {
		res.redirect('/');
	});
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
