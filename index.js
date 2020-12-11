const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const userRoute = require('./routers/user.router');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser());

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Trần Đức Soạn',
    });
});

app.use('/users', userRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});