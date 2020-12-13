require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const userRoute = require('./routers/user.router');
const authRoute = require('./routers/auth.router');

const authMiddleware = require('./middlewares/auth.middleware');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET));

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});