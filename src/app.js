const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const routes = require('./routes')
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.use('/contracts', routes.contracts)
app.use('/jobs', routes.jobs)
app.use('/balances', routes.balance)
app.use('/admin', routes.admin)

module.exports = app;
