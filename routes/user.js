const express = require('express');
const router = express.Router();
const passport = require('passport');

const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');


router.get('/', (req, res) => {
    res.redirect('/contacts');
});


router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post(
    '/register',
    catchAsync(async (req, res, next) => {
        try {
            const {username, email, password} = req.body;
            const user = new User({username, email});
            const registeredUser = await User.register(user, password);
            req.login(registeredUser, (err) => {
                if (err) return next(err);
                req.flash('success', 'Vítejte v aplikaci Kontakty!');
                res.redirect('/contacts');
            });
        } catch (error) {
            req.flash('error', error.message);
            res.redirect('register');
        }
    })
);

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post(
    '/login',
    passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login',
    }),
    (req, res) => {
        req.flash('success', 'Vítejte zpět!');
        res.redirect('/contacts');
    }
);

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Nashledanou!');
        res.redirect('/contacts');
    });
});

module.exports = router;
