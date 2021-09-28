// LANDING PAGE
const index = (req, res) => {
    res.render('index');
}

// GAME PAGE
const game = (req, res) => {
    res.render('game');
}

module.exports = {
    index,
    game
}