
import mongoose, {Schema} from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema({
    email : {
        type : String,
        unique : true,
        trim : true,
        required : [true, "email is required"]
    }
})

userSchema.plugin(passportLocalMongoose);

export const User = mongoose.model("User", userSchema);