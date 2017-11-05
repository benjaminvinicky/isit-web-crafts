/**
 * Created by charlie on 7/11/16.
 */

var express = require('express');
var router = express.Router();

module.exports = function(passport) {
    'use strict';

    /* GET home page. */
    router.get('/login', function(req, res, next) {
        console.log('in get login');
        res.render('login', {
            title: 'Elf Login',
            user: req.user
        });
    });

    router.post('/loginUser', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    router.get('/loggedin', function(request, response) {
        response.send(request.isAuthenticated());
    });

    router.get('/signup', function(req, res) {
        console.log('Get signup');
        res.render('register', {});
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/#/login',
        failureRedirect: '/signup'
    }));

    return router;
};