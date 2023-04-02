const Contact = require('../models/contact');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'Je vyžadováno přihlášení');
    return res.redirect('/login');
  } else {
    //req.flash('success', 'User logged in');
    next();
  }
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!req.user._id.equals(contact.owner)) {
    req.flash('error', 'Nemáte oprávnění k provedení této akce!');
    return res.redirect(`/contacts`);
  }
  next();
};
