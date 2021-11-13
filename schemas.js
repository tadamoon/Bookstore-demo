const { number } = require('joi');
const Joi=require('joi');
  //if(!req.body.book) throw new ExpressError('Invalid Story Data', 400);  //no longer needed because of joi                                  // handle mongoose error
  module.exports.productSchema=Joi.object({
    book: Joi.object({
        name: Joi.string().required(),
        author: Joi.string().required(),
        image: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        storyText: Joi.string().required()
    }).required()
}) 

module.exports.reviewSchema=Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})

