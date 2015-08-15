'use strict';

var http = require('http')
,express = require('express')
,routes = require('./lib/routes')
,logger = require('morgan')
,parser = require('body-parser')
,app = express()
,auth = require('basic-auth')
,server = http.createServer(app);

app.use(logger('combined' ));
app.use(parser.json());
app.use(function(req, res, next) {
	var user = auth(req);

	if (user === undefined || user['name'] !== 'test' || user['pass'] !== 'test') {
		res.statusCode =401;
		res.setHeader('www-Authenticate', 'Basic realm="MyRealmName"');
		res.end('Unauthorized');
	} else {
		next();
	}
});
app.use( express.static( __dirname+ '/public' ) );

routes.configRoutes(app,server);

server.listen(5555);