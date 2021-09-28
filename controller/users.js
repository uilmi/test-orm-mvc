let userStatic = require('../db/users.json');


// LOGIN GET /login 
const showLogin = (req, res) => {
    res.render('users/login', { message: '' });
}

// LOGIN POST
const checkLogin = (req, res) => {
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
}

// SIGNUP POST /signup 
const postSignup = (req, res) => {
    user_game.create({
        username: req.body.username,
        password: req.body.password
    }).then((user) => {
        user_game_biodata.create({
            name: req.body.name,
            user_id: user.id,
        }).then((user) => {
            user_game_history.create({
                result: req.body.result,
                user_id: user.id,
            })
            res.redirect('/dashboard');

        })

    })
}

// SIGN UP GET /signup
const showSignup = (req, res) => {
    res.render('users/signup');
}


// DASHBOARD GET /dashboard
const showDashboard = async (req, res) => {
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
}


// VIEW PROFILE BY ID - GET /users/:id'
const showUserID = (req, res) => {
    user_game.findOne({
        include: [
            { model: user_game_biodata, as: 'user_biodata' },
            { model: user_game_history, as: 'user_history' }
        ],
        where: { id: req.params.id },
    }).then((users) => {
        res.render('users/profile', { users });
    })
}

// UPDATE PROFILE BY ID - GET /users/update/:id
const updateUserID = (req, res) => {
    user_game.findOne({
        include: [
            { model: user_game_biodata, as: 'user_biodata' },
            { model: user_game_history, as: 'user_history' }],
        where: { id: req.params.id }
    }).then((users) => {

        res.render('users/update', { users });
    })
}

const postUpdateUserID = (req, res) => {
    user_game.update({
        username: req.body.username,
        password: req.body.password
    }, {
        where: {
            id: req.params.id,
        },
    }).then(() => {
        user_game_biodata.update({
            name: req.body.name,

        }, {
            where: {
                user_id: req.params.id,
            },
        }).then(() => {
            user_game_history.update({
                result: req.body.result,

            }, {
                where: {
                    user_id: req.params.id,
                },
            }).then((user) => {
                res.redirect('/dashboard');
            });
        })
    })
}


// REMOVE USER - GET /users/delete/:id
const deleteUserID = (req, res) => {
    user_game_biodata.destroy({
        where: {
            user_id: req.params.id,
        },
    })

    user_game_history.destroy({
        where: {
            user_id: req.params.id,
        },
    })

    user_game.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.redirect('/dashboard');
    })
}

const redir = (req, res) => {
    res.redirect('/dashboard'); // just so the app won't crash when /users/update is accessed
}

module.exports = {
    showLogin,
    checkLogin,
    postSignup,
    showSignup,
    postSignup,
    showDashboard,
    showUserID,
    updateUserID,
    postUpdateUserID,
    deleteUserID,
    redir

}