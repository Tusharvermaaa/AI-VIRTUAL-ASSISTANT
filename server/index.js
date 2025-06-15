import express from 'express';
import path from "path"
import dotenv from 'dotenv';
import {connectdb}  from './config/databaseconfig.js';
import cookieParser from 'cookie-parser';
import auth_router from "./routes/auth.routes.js";
import cors from "cors"
// to get the __dirname in ejs or module js system
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port=process.env.PORT || 7001;

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.static(path.join(__dirname, "public"))); // to configure the public folder 
app.use(express.urlencoded({extended:true})); // to accept the form data 
app.use(express.json());// to accept the date in json format 
app.use(cookieParser());

connectdb();

app.get("/" , (req,res)=>{
    return res.json({"message":" working in indexjs"});
})
app.use("/user", auth_router);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
