import mongoose from "mongoose";
import { Schema } from "mongoose";

const token = new Schema
({
   name:String,
   email:String,
   password:String,
   accessToken:String
})

export default mongoose.model("Tokens",token);