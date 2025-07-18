const Joi = require('joi');
const review = require('./models/review');

module.exports.ListingSchema = Joi.object({
  Listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().allow('', null)
  }).required()
});

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating : Joi.number().min(1).max(5).required(),
        comment : Joi.string().required(),
    }).required()
})