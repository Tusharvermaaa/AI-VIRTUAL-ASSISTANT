import {userModel} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import cookie from "cookie-parser";
async function signup_auth(req, res)
{
    const { name , password, email}=req.body;
    const user=await userModel.findone({email});
    if(user) return res.json({"status" : "user already exists in the system "});
    if(password.length<3) return res.json({"status": "password length less then 3"});
    const hashedpassword= await bcrypt.hahs(password, process.env.SALT);
    const createduser=await userModel.create({name , password:hashedpassword, email});

   const token=genToken(createduser.id , email);
   
   res.cookie("token" , token , {
    sameSite:"strict" , 
    secure: false, 
    httponly:true,
    maxAge:4*24*60*60*1000
   })
   return res.status(201).send(createduser);

}

// login authentication

async function login_auth(req, res)
{
    const {email , password }=req.body;
    const user=userModel.findone( {email} );
    if(!user){
        return res.send({"message":  "user does not exists with the given email"})
    }
    const pmatch=await bcrypt.compare(password, user.password);
    if(!pmatch){
        return res.status(400).send({"message": " password incorrect "});
    }

    const token=genToken(createduser.id , email);
    res.cookie("token" , token , {
    sameSite:"strict" , 
    secure: false, 
    httponly:true,
    maxAge:4*24*60*60*1000
   })

    return res.status(200).send(user);
    


}