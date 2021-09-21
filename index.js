const express = require('express');
const app = express();
const { user_game, user_game_biodata, user_game_history } = require('./models')
let userStatic = require('./db/users.json');


const PORT = 3000;
const LOCALHOST = 'http://localhost';

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


// LANDING PAGE
app.get('/', (req, res) => {
    res.render('index');
});

// GAME PAGE
app.get('/game', (req, res) => {
    res.render('game');
});

// LOGIN 
app.get('/login', (req, res) => {
    res.render('users/login', { message: '' });
})

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let userFound = userStatic.find((userStatic) => {
        return userStatic.username == username;
    })

    if (!userFound) {
        console.log('not found');
        return res.render('users/login', {
            message: 'User not found'
        });
    }

    if (userFound.password != password) {
        console.log('wrong pass');
        return res.render('users/login', {
            message: 'Incorrect password'
        });
    }
    res.redirect('/dashboard');
})

// SIGNUP
app.post('/signup', (req, res) => {
    user_game.create({
        username: req.body.username,
        password: req.body.password
    }).then((user) => {
        user_game_biodata.create({
            name: req.body.name,
            user_id: user.id,
        })
        res.redirect('/dashboard');
    })
})

app.get('/signup/', (req, res) => {
    res.render('users/signup');
})


// DASHBOARD
app.get('/dashboard', async (req, res) => {
    const users = await user_game.findAll({
        order: [
            ['id', 'ASC'], // Sorts by ID in ascending order in the user dashboard
        ],
        include: [
            { model: user_game_biodata, as: 'user_biodata' },
            { model: user_game_history, as: 'user_history' }
        ],
    })
    res.render('users/dashboard', {
        users
    });
})


// VIEW PROFILE BY ID
app.get('/users/:id', (req, res) => {
    const usersID = user_game.findOne({
        include: [
            { model: user_game_biodata, as: 'user_biodata' },
            { model: user_game_history, as: 'user_history' }
        ],
        where: { id: req.params.id },
    }).then((users) => {
        res.render('users/profile', { users });
    })
})

// UPDATE PROFILE BY ID
app.get('/users/update/:id', (req, res) => {
    user_game.findOne({
        include: [
            { model: user_game_biodata, as: 'user_biodata' },
            { model: user_game_history, as: 'user_history' }],
        where: { id: req.params.id }
    }).then((users) => {

        res.render('users/update', { users });
    })
})

app.post('/users/update/:id', (req, res) => {
    user_game.update({
        username: req.body.username,
        password: req.body.password
    },
        { where: { id: req.body.id } }
    ).then((users) => {
        user_game_biodata.update({
            name: req.body.name,
            user_id: users.id,
        })

        res.redirect('/dashboard');
    })
})

// REMOVE USER
app.get('/users/delete/:id', (req, res) => {
    const userBiodata = user_game_biodata.destroy({
        where: {
            user_id: req.params.id,
        },
    })

    const userGame = user_game.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.redirect('/dashboard');
    })
})

app.get('/users/', (req, res) => {
    res.redirect('/dashboard'); // just so the app won't crash when /users/update is accessed
})

// SERVER
app.listen(PORT, () => {
    console.log(`Server ready -> ${LOCALHOST}:${PORT} `);
});