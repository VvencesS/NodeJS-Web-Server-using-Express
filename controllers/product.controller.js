const Product = require('../models/product.model');

module.exports.index = (req, res) => {
    Product.find()
        .then((products) => {
            res.render('products/index', {
                products,
            })
        })
};
