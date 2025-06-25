import express from 'express';
import path from "path"
import session from "express-session";

import dotenv from 'dotenv';
import {connectdb}  from './config/databaseconfig.js';
import cookieParser from "cookie-parser";
import auth_router from "./routes/auth.routes.js";
import cors from "cors"
// to get the __dirname in ejs or module js system
import { fileURLToPath } from "url";
import curuserroute from './routes/curuser.routes.js';
import isAuth from './middlewares/isAuth.js';
import { geminiresponse } from './gemini.js';
import geminicontroller from './controllers/gemini.controller.js';
import geminirouter from './routes/gemini.routes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port=(process.env.PORT )|| 7001;

dotenv.config();

const app = express();
app.use(cookieParser());
// toremove --
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",   // ✅ allow sending cookies from localhost
      secure: true      // ✅ allow HTTP not HTTPS
    }
  })
);
//  toremove ---
app.use(cors({
  origin:['https://assistant-ai-fz7c.onrender.com', 'http://localhost:4173','http://localhost:5173'],
  credentials: true
}));
app.use((req, res, next)=>{
  console.log(req.cookies , " are cookies in res ");
  next();
})
app.use(express.static(path.join(__dirname, "public"))); // to configure the public folder 
app.use(express.urlencoded({extended:true})); // to accept the form data 
app.use(express.json());// to accept the date in json format 

connectdb();

app.use("/current", isAuth ,curuserroute );
app.use("/command" , isAuth , geminirouter);
app.use("/user", auth_router);
// app.get("/"  ,async (req, res)=>{
//      const response=await geminiresponse(req.query.prompt);
//      return res.json(response);
//         //  the response from api can be get in the form of 
//         // response= result.data   (result is the response of axios promise)
//         //  : response.candidates[0].content.parts[0].text // embeded 
//         //       response.responseId 
//         //       response.modelVersion
// })
app.get("/" , (req,res)=>{
    return res.json({"message":" working in indexjs"});
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
