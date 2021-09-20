const express = require('express');
const app = express();


const port = 3000;

let users = require('./db/users.json');
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index', {
        linkGame: "/game" //ejs href template
    });
});

app.get('/game', (req, res) => {
    res.render('game', {
        back: "/",           //ejs href template
        linkGame: "/game"    // ejs href template
    });
});

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
    let user = users.find((item) => {
        return item.id == req.params.id;
    });
    res.status(200).json(user);
});

app.post('/login', (req, res) => {
    let checkUsername = req.body.username;
    let checkPassword = req.body.password;
    let usernameData = users.find(username => username.username === req.body.username);
    let passwordData = users.find(password => password.password === req.body.password);

    try {
        if (checkUsername == usernameData.username && checkPassword == passwordData.password) {
            console.log('Login is successful!' + " " + `Welcome back, ${checkUsername}!`);
            res.status(200);
            res.redirect(301, '/game');
        }
    } catch {
        console.log("Either username or password is incorrect. Please try again!");
        res.status(403);          // 403 - Forbidden wrong username and password were sent in the request
        res.redirect(301, '/');      //301 - Redirecting to the homepage

    }
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const lastItem = users[users.length - 1];
    const id = lastItem.id + 1;

    const user = {
        id: id,
        username: username,
        password: password
    }

    users.push(user);
    res.status(201).json(user);

});


app.listen(port, () => {
    console.log(`The app is running at http://localhost:${port}`);
});