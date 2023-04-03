const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const Contact = require('../models/contact');
const {validateContact} = require('../middleware/validation');
const {isLoggedIn, isOwner} = require('../middleware/authentication');


router.get(
    '/',
    isLoggedIn,
    catchAsync(async (req, res) => {
        const contacts = await Contact.find({'owner': req.user._id}).populate('owner');
        res.render('contacts/index', {contacts});
    })
);


router.get('/new', isLoggedIn, (req, res) => {
    res.render('contacts/new');
});

router.post(
    '/',
    isLoggedIn,
    validateContact,
    catchAsync(async (req, res, next) => {
        const contact = new Contact(req.body.contact);
        contact.owner = req.user._id;
        await contact.save();
        req.flash('success', 'Kontakt vytvořen');
        res.redirect('/contacts');
    })
);

router.get(
    '/:id',
    isLoggedIn,
    isOwner,
    catchAsync(async (req, res) => {
        const {id} = req.params;
        try {
            const contact = await Contact.findById(id).populate('owner');
            res.render('contacts/show', {contact});
        } catch (err) {
            req.flash('error', 'Kontakt nalezen');
            return res.redirect('/contacts');
        }
    })
);


router.get(
    '/:id/edit',
    isLoggedIn,
    isOwner,
    catchAsync(async (req, res) => {
        const {id} = req.params;
        const contact = await Contact.findById(id);
        if (!contact) {
            req.flash('error', 'Kontakt nenalezen');
            return res.redirect('/contacts');
        }
        res.render('contacts/edit', {contact});
    })
);


router.patch(
    '/:id',
    isLoggedIn,
    isOwner,
    validateContact,
    catchAsync(async (req, res) => {
        const {id} = req.params;
        const contact = await Contact.findByIdAndUpdate(id, {
            ...req.body.contact,
        });
        req.flash('success', 'Kontakt upraven');
        res.redirect(`/contacts/${contact.id}`);
    })
);


router.delete(
    '/:id',
    isLoggedIn,
    isOwner,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        req.flash('success', 'Kontakt odstraněn');
        res.redirect('/contacts');
    })
);


module.exports = router;
