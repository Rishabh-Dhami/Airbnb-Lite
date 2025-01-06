
import mongoose, {Schema} from "mongoose";



const reviewSchema = new Schema({
    comment : {
        type : String,
        required : true,
        trim : true
    },
    rating : {
        type : Number,
        min : [1, "rating must be in between 1 to 5"],
        max : [5, "rating must be in between 1 to 5"],
        required: [true, "Rating is required"],
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true});

export const Review = mongoose.model("Review", reviewSchema);