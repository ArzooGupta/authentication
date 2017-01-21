const Router = require('express').Router();
const auth = require('./auth');

Router.use(require('body-parser').json());
Router.use('/auth', auth);
module.exports = Router;