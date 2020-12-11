const express = require('express');
const app = express();
const port = 3000;

const low = require('lowdb');
const shortid = require('shortid');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [], }).write();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Soạn',
    });
});

app.get('/users', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value(),
    });
});

app.get('/users/search', (req, res) => {
    var q = req.query.q;
    var matchUsers = users.filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchUsers,
    });
});

app.get('/users/create', (req, res) => {
    res.render('users/create');
});

app.get('/users/:id', (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();

    res.render('users/view', {
        user,
    });
});

app.post('/users/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});