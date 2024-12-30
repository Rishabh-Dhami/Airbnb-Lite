import mongoose from "mongoose";
import express from "express";
import 'dotenv/config'
const app = express();
import { mongoUrl , port} from "../config.js";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(mongoUrl);
    if(con){
        console.log(`MongoDB connected: ${con.connection.host}`);
        app.listen(port, () => {
            console.log(`server is running at ${port}`);
            
        })
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with a failure code
  }
};

export {connectDB, app}
