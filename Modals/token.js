import mongoose from "mongoose";
import { Schema } from "mongoose";

const newtoken = new Schema({
  acesstoken: String,
});

export default mongoose.model("newtokens", newtoken);
