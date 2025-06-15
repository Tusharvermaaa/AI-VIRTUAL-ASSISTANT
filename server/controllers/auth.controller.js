import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {genToken} from "../config/token.js";


export async function signup_auth(req, res)
{
    console.log("authentaication working , please be prepared ");
    console.log(req.body , "inside signup auth controller auth.controller ");
    const { name , password, email}=req.body;
    console.log(req.body , " inside the authcontroller dignup functiom");
    const user=await userModel.findOne({email});
    if(user) return res.json({"status" : "user already exists in the system  auth controller "});
    if(password.length<3) return res.json({"status": "password length less then 3 auth controller"});
    const hashedpassword= await bcrypt.hash(password,Number( process.env.SALT));
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

export async function login_auth(req, res)
{
    const {email , password }=req.body;
    const user=userModel.findone( {email} );

    if(!user){
        return res.send({"message":  "user does not exists with the given email auth controller"})
    }
    const pmatch=await bcrypt.compare(password, user.password);

    if(!pmatch){
        return res.status(400).send({"message": " password incorrect auth controller"});
    }

    const token=genToken(createduser.id , email);
    res.cookie("token" , token , {
    sameSite:"strict" , 
    secure: false, 
    httponly:true,
    maxAge:4*24*60*60*1000
   });

    return res.status(200).send(user);
}

//logout 

export async function logout_auth(req, res)
{
    try{

        res.clearCookie("token");
        return res.status(200).send({"message": "logout successfully from auth.controller"})
    }
    catch(err)
    {
        return res.status(400).send({"message":"logout error  ,  auth controler"});
    }
}

// export default {signup_auth , login_auth , logout_auth};

// user login and logour functionality working
/*
signup - generate token 
login - generate token 
*/