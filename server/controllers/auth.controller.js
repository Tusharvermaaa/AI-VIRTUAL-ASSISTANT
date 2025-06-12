import {userModel} from "../models/user.model.js";
import bcrypt from "bcryptjs";
async function signupauth(req, res)
{
    const { name , password, email}=req.body;
    const user=await userModel.findone({email});
    if(user) return res.json({"status" : "user already exists in the system "});
    if(password.length<3) return res.json({"status": "password length less then 3"});
    const hashedpassword= await bcrypt.hahs(password, process.env.SALT);
    const createduser=await userModel.create({name , password:hashedpassword, emaiil});
    
}