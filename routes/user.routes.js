module.exports = app => {
    const users = require('../controllers/user.controller.js');
    const router = require('express').Router();
  
    router.post('/signup', users.signUp);
    router.post('/login', users.login);
    router.post('/logout', users.logout);
    router.post('/getCouponCode', users.getCouponCode);
    router.post('/bookShow', users.bookShow);
  
    app.use('/api/users', router);
  };
  