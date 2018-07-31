const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = (app) => {
    // global middlewares
    app.use(morgan('dev'));
    app.use(bodyParser.json());
}