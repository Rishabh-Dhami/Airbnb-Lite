import mongoose, {Schema, set} from "mongoose";
import { Review } from "./review.model.js";


const listingSchema = new Schema({
    title : {
        type : String,
        required : [true, "title is required"],
        trim : true
    },
    description : {
        type : String,
        required : [true, "description is required"],
        trim : true
    },
    image: {
        filename: {
          type: String,
          default : "Listing Image",
          trim: true,
        },
        url: {
          type: String,
          required: [true, "Image URL is required"],
          trim: true,
          set : (v) => v === "" ? 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60' : v,
          default : 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
        },
      },
    price : {
        type : Number,
        required : [true, "price is required"],
        min : [0, "price must be positive number"]
    },
    location : {
        type : String,
        required : [true, "location is required"],
        trim : true
    },
    country : {
        type : String,
        required : [true, "country is required"],
       trim : true
    },
    reviews : [
      {
      type : Schema.Types.ObjectId,
      ref : "Review"
      } 
    ],
    owner : {
      type : Schema.Types.ObjectId,
      ref : "User"
    }

})


listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing && Array.isArray(listing.reviews) && listing.reviews.length) {
      await Review.deleteMany({ _id: { $in: listing.reviews } });
      console.log("Deleted associated reviews");
  }
});

export const Listing = mongoose.model("Listing", listingSchema);


