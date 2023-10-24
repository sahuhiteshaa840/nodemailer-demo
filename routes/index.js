var express = require('express');
var router = express.Router();
const USER = require('../models/user')
const bcrypt = require('bcrypt');
const userController = require('../controllers/users')

// hash => signup
// compare => login

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', userController.SignUp);

router.post('/login', userController.Login);

router.get('/allusers', userController.Secure, userController.AllUsers);

router.get('/user/:id', userController.Secure, userController.GetUser);

router.delete('/user/:id', userController.Secure, userController.DeleteUser);

router.put('/user/:id', userController.Secure, userController.UpdateUser);

module.exports = router;

// OK => 200
// Created => 201
// No Content => 204
// Not Found => 404
// server error => 500



// post => /students
// get => /students
// delete => /students/:id
// put or patch => /students/:id