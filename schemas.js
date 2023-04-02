const Joi = require('joi');

module.exports.contactSchema = Joi.object({
    contact: Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        birthday: Joi.date().optional().allow('').allow(null),
        email: Joi.string().optional().allow('').allow(null),
        phone: Joi.string().optional().allow('').allow(null),
        street: Joi.string().optional().allow('').allow(null),
        house_number: Joi.number().optional().allow('').allow(null),
        city: Joi.string().optional().allow('').allow(null),
        postcode: Joi.number().optional().allow('').allow(null),
        position: Joi.string().optional().allow('').allow(null),
        company: Joi.string().optional().allow('').allow(null),
        department: Joi.string().optional().allow('').allow(null),
        note: Joi.string().optional().allow('').allow(null),
        country: Joi.string().optional().allow('').allow(null),
    }),
});