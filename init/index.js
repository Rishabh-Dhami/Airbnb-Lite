
import { connectDB } from "../database/db.js";
import { Listing } from "../models/listing.model.js";
import { data } from "./data.js";

connectDB();


const initDb = async() => {
    await Listing.deleteMany({});
    let information = data.map((info) => ({...info, owner : "6740c171ea385d4f9a7a6661"}))
    await Listing.insertMany(information);
    console.log("data is initailized in db");
    
}

initDb();