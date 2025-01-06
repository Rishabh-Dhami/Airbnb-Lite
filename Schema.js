import Joi from "joi";

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().integer().min(1),
        image: Joi.object({
            filename: Joi.string()
                .trim()
                .default("Listing Image")
                .messages({
                    "string.empty": "Filename cannot be empty",
                }),
        
            url: Joi.string()
                .uri()
                .trim()
                .required()
                .messages({
                    "string.empty": "Image URL is required",
                    "any.required": "Image URL is required",
                    "string.uri": "Image URL must be a valid URI",
                })
        }) // Corrected this line
    }).required()
});

export { listingSchema };






const reviewSchema = Joi.object({
    comment: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Comment cannot be empty",
            "any.required": "Comment is required"
        }),
    rating: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .required()
        .messages({
            "number.base": "Rating must be a number",
            "number.min": "Rating must be between 1 to 5",
            "number.max": "Rating must be between 1 to 5",
            "any.required": "Rating is required"
        })
});

export { reviewSchema };
