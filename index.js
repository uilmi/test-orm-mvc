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
// END LOGIN

// SIGNUP
app.post('/signup', (req, res) => {
    user_game.create({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name
    }).then(user => {
        res.send('User berhasil dibuat!');
    })
})

app.get('/signup/', (req, res) => {
    res.render('users/signup');
})
// END SIGNUP

// DASHBOARD
app.get('/dashboard', async (req, res) => {
    const users = await user_game.findAll({
        include: [{ model: user_game_biodata, as: 'user_biodata' },
        { model: user_game_history, as: 'user_history' }],
    })
    res.render('users/dashboard', {
        users
    })
})
// END DASHBOARD

app.listen(PORT, () => {
    console.log(`Server ready -> ${LOCALHOST}:${PORT} `);
});








// app.get('/dashboard', (req, res) => {
//     const users = user_game.findAll({
//         where: {},
//         include: [{
//             model: user_game_biodata,
//             where: {}
//         }],
//     }).then((users, ) => {
//         // res.render('users/dashboard', { users });
//         console.log("*********************\n\n\n\n\n", users);
//         // console.log("*********************\n\n\n\n\n", users);
//     })


// console.log(score);
// try {
//     const biodata = user_game_biodata.findAll({
//         include: [{ model: user_game, as: 'user_biodata' }]
//     });
//     // const scores = user_game_history.findAll({

//     // });

//     user_game.findAll({
//         order: [
//             ['id', 'ASC'], // Sorts by ID in ascending order in the user dashboard
//         ]
//     }).then(users => {
//         res.render('users/dashboard', {
//             users,
//             biodata: biodata[0],
//         });
//     })
// } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
// }

// })

// app.get('/users', (req, res) => {
//     res.status(200).json(users);
// });

// app.get('/users/:id', (req, res) => {
//     let user = users.find((item) => {
//         return item.id == req.params.id;
//     });
//     res.status(200).json(user);
// });

// app.post('/login', (req, res) => {
//     let checkUsername = req.body.username;
//     let checkPassword = req.body.password;
//     let usernameData = users.find(username => username.username === req.body.username);
//     let passwordData = users.find(password => password.password === req.body.password);

//     try {
//         if (checkUsername == usernameData.username && checkPassword == passwordData.password) {
//             console.log('Login is successful!' + " " + `Welcome back, ${checkUsername}!`);
//             res.status(200);
//             res.redirect(301, '/game');
//         }
//     } catch {
//         console.log("Either username or password is incorrect. Please try again!");
//         res.status(403);          // 403 - Forbidden wrong username and password were sent in the request
//         res.redirect(301, '/');      //301 - Redirecting to the homepage

//     }
// });

// app.post('/register', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     const lastItem = users[users.length - 1];
//     const id = lastItem.id + 1;

//     const user = {
//         id: id,
//         username: username,
//         password: password
//     }

//     users.push(user);
//     res.status(201).json(user);

// });


