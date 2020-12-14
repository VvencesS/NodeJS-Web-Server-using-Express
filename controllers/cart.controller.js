const db = require('../routers/db');

module.exports.addToCart = (req, res, next) => {
    let productId = req.params.productId;
    let sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/products');
        return;
    }

    let count = db
        .get('sessions')
        .find({ id: sessionId },)
        .get('cart.' + productId, 0)
        .value();

    db.get('sessions')
        .find({ id: sessionId },)
        .set('cart.' + productId, count + 1)
        .write();

    res.redirect('/products');
};

module.exports.index = (req, res) => {
    if(!req.signedCookies.sessionId) {
        res.redirect('products');
        return;
    }

    let sessionId = req.signedCookies.sessionId;
    let cart = db
        .get('sessions')
        .find({ id: sessionId })
        .get('cart')
        .value();
    // delete cart.undefined;

    let keys = Object.keys(cart);
    let values = Object.values(cart);
    let newCart = [];
    for (let i = 0; i < keys.length; i++) {
        let productCart = {
            productId: keys[i],
            amount: values[i],
        }
        newCart.push(productCart);
    }
     
        res.render('cart/index', {
            newCart: newCart,
        });
};
