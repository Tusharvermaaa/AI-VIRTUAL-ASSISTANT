import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: {  type: String, required: true} ,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    assistantname:{type: String},
    assistantimage:{type: String},
    history: [
        {type: String}
    ],
},{timestamps: true}); 


const userModel = mongoose.model('User', userSchema); // document name is User  (inside mongodb)

export default userModel;  