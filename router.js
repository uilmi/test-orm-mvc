const router = require('express').Router();
const home = require('./controller/home');
const users = require('./controller/users')

router.get('/', home.index);
router.get('/game', home.game);
router.get('/login', users.showLogin);
router.post('/login', users.checkLogin);
router.get('/signup', users.showSignup);
router.post('/signup', users.postSignup);
router.get('/dashboard', users.showDashboard);
router.get('/users/:id', users.showUserID);
router.get('/users/update/:id', users.updateUserID);
router.post('/users/update/:id', users.postUpdateUserID);
router.get('/users/delete/:id', users.deleteUserID);
router.get('/users', users.redir);


module.exports = router;