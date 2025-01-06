import { Review } from "../models/review.model.js";
import { Listing } from "../models/listing.model.js";
import { Errorhandler } from "../utils/Errorhandler.js";
export const createReview = async(req, res, next) => {
    
    let list = await Listing.findById(req.params.id);
    let review1 =  new Review(req.body.review);

    review1.author = req.user._id;
    list.reviews.push(review1);
    
    
    await review1.save();
    await list.save();
    
    console.log("review saved");
    req.flash("success", "review added  successfully!");
    res.redirect(`/listings/${list._id}`);
    
    
}

export const destroyReview = async(req, res, next) => {
    let {id, reviewid} = req.params;


    let list = await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewid}});
    await Review.findByIdAndDelete(reviewid);

    console.log("review deleted");
    req.flash("error", "review deleted successfully!");
    res.redirect(`/listings/${id}`);
}