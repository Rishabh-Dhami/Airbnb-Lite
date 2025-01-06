import dotenv from 'dotenv';

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const port = String(process.env.PORT);
const mongoUrl = String(process.env.MONGO_URL);
const sessionSecret = String(process.env.SECRET)

// cloud config

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'RisAirbnb', // Specify the folder in Cloudinary
        allowedFormats: ["png", "jpg", "jpeg"], // Corrected from "allowerdFormats"
    },
});


export {
    port,
    mongoUrl,
    storage,
    sessionSecret
}