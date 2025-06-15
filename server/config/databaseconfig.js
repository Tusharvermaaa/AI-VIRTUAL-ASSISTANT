import mongoose from "mongoose";


export function  connectdb() {
    mongoose.connect(process.env.connectionstring)
    .then(()=>{console.log("Database connected successfully on port ");})
    .catch((err)=>{console.log("Database connection failed: " + err);});
}

