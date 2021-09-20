const { user_game, user_game_biodata, user_game_history } = require('./models')

user_game.create({
    username: 'ulul',
    password: 'binar'
}).then(user => {
    console.log('user created!')
})

user_game_history.create({
    user_id: '1',
    result: '25'
}).then(user => {
    console.log('user created!')
})


user_game_biodata.create({
    user_id: '1',
    name: 'Ulul Academy'
}).then(user => {
    console.log('user created!')
})

// To create the initial user and password before implementing create new user form