import { Listing } from "../models/listing.model.js";
import { Review } from "../models/review.model.js";
import { listingSchema, reviewSchema } from "../Schema.js";
import { Errorhandler } from "../utils/Errorhandler.js";



export const isLogin = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        
        req.flash("error", "you must be login to create listing");
        return res.redirect("/login");
    }
    next();
}

export const saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

export const isOwner = async(req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!res.locals.currUser._id.equals(listing.owner._id)){
        req.flash("error", "you don't have permission");
        res.redirect(`/listings/${id}`)
    }
    next();
}


export const isReviewAuthor = async(req, res, next) => {
    let {id, reviewid} = req.params;
    let listing = await Review.findById(reviewid);
    if(!res.locals.currUser._id.equals(listing.author._id)){
        req.flash("error", "you don't have permission");
        res.redirect(`/listings/${id}`)
    }
    next();
}

export const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body.listing);

    if(error){
        let errMssg = error.details.map((e) => e.message).join(",");
         return  next(new Errorhandler(401, errMssg));
    }else{
        return next();
    }
}


export const reviewvalidte = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body.review);

    if(error){
        let errMssg = error.details.map((e) => e.message).join(",");
        throw new Errorhandler(401, errMssg)
    }else{
        next();
    }
}