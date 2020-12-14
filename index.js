require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const app = express();
const port = 3000;

const userRoute = require('./routers/user.router');
const authRoute = require('./routers/auth.router');
const productRoute = require('./routers/product.router');
const cartRoute = require('./routers/cart.router');
const transferRoute = require('./routers/transfer.router');

const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(sessionMiddleware);

app.use(csrf({ cookie: true }));

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Trần Đức Soạn',
    });
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});