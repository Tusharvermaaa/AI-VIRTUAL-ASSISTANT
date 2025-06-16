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
export async function login_auth(req, res) {
    try {
        console.log("login handling server, req.body is", req.body);
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user with password (must await this query!)
        const user = await userModel.findOne({ email }).select("+password");
        
        if (!user) {
            console.log("user does not exist");
            return res.status(404).json({ message: "User not found" });
        }

        // Compare passwords
        const pmatch = await bcrypt.compare(password, user.password);
        if (!pmatch) {
            console.log("password does not match");
            return res.status(401).json({ message: "Incorrect password" });
        }

        console.log("generating token");
        const token = genToken(user.id, email);
        
        // Set cookie
        res.cookie("token", token, {
            sameSite: "strict",
            secure: false,
            httpOnly: true,
            maxAge: 4 * 24 * 60 * 60 * 1000
        });

        console.log("returning the response");
        return res.status(200).json({
            status: "Login successful",
            user: {
                id: user._id,
                email: user.email
                // Add other non-sensitive user fields here
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
/*
export async function login_auth(req, res)
{
    console.log("login handlinin server ,req.body is " , req.body);
    const {email , password }=req.body;
    if(!email || !password){return res.json({"message": " some field missing"})}
    const user=userModel.findOne( {email} ).select("+password");

    if(!user){
        console.log("user does  not exists")
        return res.send({"message":  "user does not exists with the given email auth controller"})
    }
    //  console.log(password, " " , user.password , " " , user);
     // 3️⃣ Ensure user.password (hashed) exists
    // if (!user.password) {
    //   return res.status(500).json({ error: "Invalid user data (missing password)" });
    // }

    // const pmatch=await bcrypt.compare(password, user.password);

    // if(!pmatch){
    //     console.log("password does not match")
    //     return res.status(400).send({"message": " password incorrect auth controller server"});
    // }
     console.log("generating token")
    const token=genToken(user.id , email);
    res.cookie("token" , token , {
    sameSite:"strict" , 
    secure: false, 
    httponly:true,
    maxAge:4*24*60*60*1000
   });
   console.log("returning the res.status .suer")
   return res.json({"status":"login successfully "});
    // return res.status(200).send(user);
}
*/
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