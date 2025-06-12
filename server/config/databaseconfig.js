import mongoose from "mongoose";


function  connectdb() {
    mongoose.connect(process.env.connectionstring)
    .then(()=>{console.log("Database connected successfully on port ");})
    .catch((err)=>{console.log("Database connection failed: " + err);});
}
export default connectdb;
// module.exports = { connectdb };