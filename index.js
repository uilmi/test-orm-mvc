const express = require('express');
const app = express();
const { user_game, user_game_biodata, user_game_history } = require('./models')
let userStatic = require('./db/users.json');

const PORT = process.env.PORT || 8000;
const LOCALHOST = 'http://localhost';

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


// ROUTER
const router = require('./router');
app.use(router);


// SERVER
app.listen(PORT, () => {
    console.log(`Ready to serve you my master -> ${LOCALHOST}:${PORT} `);
});