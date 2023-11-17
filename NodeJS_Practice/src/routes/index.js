const newsRouter = require('./news');
const meRouter = require('./me');
const siteRouter = require('./site');
const productsRouter = require('./products');
const employee = require('./employees');
function route(app) {
    app.use('/em', employee);
    app.use('/news', newsRouter);
    app.use('/products', productsRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}
module.exports = route;
