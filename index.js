import express from "express";
import morgan from "morgan";

import mongoose, { mongo } from "mongoose";
import router from "./Routes/tokenroutes.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1',router);

mongoose.connect('mongodb+srv://kunal11295:kunal11295@cluster0.tnxk0aj.mongodb.net/awdizdb?retryWrites=true&w=majority')
.then(() =>console.log("DB connected"))
.catch((err) => console.log("Db Error =>",err));



app.listen(5000, () => console.log("Working on port 5000")); //port no

