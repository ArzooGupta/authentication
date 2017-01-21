const app = require('express')();
const http = require('http').Server(app);
const config = require('./config');
require('./io')(http);
const path = require('path');
const _ = require('lodash');


app.get('/',(req, res) => {
  res.send('Hello, World!');
});

function createApp() {
  const app = express();
  return app;
}

function setupStaticRoutes(app) {
  app.use(express.static(__dirname + '/public'));
  return app;
}

function setupMiddlewares(app) {
  app.use(require('cookie-parser')());
}

function setupRestRoutes(app) {
  app.use('/api/v1', require(path.join(__dirname, 'api')));
  return app;
}


module.exports = function(inputApp, inputOptions) {
  const app = inputApp || createApp();
  const options = inputOptions || {};

  _.defaults(options, {static: true, rest: true});

  if(options.static) {
    setupStaticRoutes(app);
  }

  if(options.rest) {
    setupMiddlewares(app);
    setupRestRoutes(app);
  }

  return app;
};
const connection=mongoose.connect('mongodb://localhost:27017/ziggurateTemp');
http.listen(config.port, () => {
  console.log('ExpressJS listening on port:', config.port);
});