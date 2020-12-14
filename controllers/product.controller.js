const db = require('../routers/db');

module.exports.index = (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let perPage = 8;

    let start = (page - 1) * perPage;
    let end = page * perPage;

    let drop = (page - 1) * perPage;

    res.render('products/index', {
        // products: db.get('products').value().slice(start, end),
        products: db.get('products').drop(drop).take(perPage).value(),
    });
};
