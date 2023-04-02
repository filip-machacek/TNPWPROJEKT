const { contactSchema } = require('../schemas');
const ExpressError = require('../utils/ExpressError');

module.exports.validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(', ');
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};
